function Secure(robot, max_retry_times) {
    this.robot = robot;
    this.max_retry_times = max_retry_times || 10;
    this.km = context.getSystemService(context.KEYGUARD_SERVICE);
    this.secure = (function () {
        let secure;

        let miui_match = shell("getprop ro.miui.ui.version.name").result.match(/\d+/);
        switch (true) {
            case (miui_match !== null):
                if (miui_match[0] === '10') {
                    secure = new MIUI10Secure(this);
                } else {
                    secure = new MIUISecure(this);
                }
                break;
            default:
                secure = new NativeSecure(this);
                break;
        }

        return secure;
    }.bind(this))();

    this.isLocked = function () {
        return this.km.inKeyguardRestrictedInputMode();
    };

    this.openLock = function (password, pattern_size) {
        while (!device.isScreenOn()) {
            device.wakeUp();
            sleep(1000); // 等待屏幕亮起
        }
        let isLocked = this.isLocked(); // 是否已经上锁
        let isSecure = this.km.isKeyguardSecure(); // 是否设置了密码
        pattern_size = pattern_size || 3;
        log({
            isLocked: isLocked,
            isSecure: isSecure
        });

        let i = 0;
        while (this.secure.hasLayer()) {
            if (!this.isLocked()) return true;

            if (i >= this.max_retry_times) {
                toastLog("打开上滑图层失败");
                return this.failed();
            }
            log("向上滑动");
            this.openLayer();
            i++;
        }

        if (!(isLocked && isSecure)) return true;
        log("解锁");
        for (let i = 0; i < this.max_retry_times; i++) {
            if (this.unlock(password, pattern_size)) {
                return true;
            } else {
                toastLog("解锁失败，重试");
            }
        }

        toastLog("解锁失败，不再重试");
        return this.failed();
    };

    this.failed = function () {
        KeyCode("KEYCODE_POWER");
        engines.stopAll();
        exit();
        return false;
    };

    this.openLayer = function () {
        let x = device.width / 2;
        let y = device.height - 300;
        this.robot.swipe(x, y, x, device.height / 2, 500);
        sleep(1500); // 等待动画
    };

    this.unlock = function (password, pattern_size) {
        let len = password.length;

        if (len < 4) {
            throw new Error("密码至少4位");
        }

        return this.secure.unlock(password, pattern_size);
    };

    this.gestureUnlock = function (pattern, password, len, pattern_size) {
        let rect = pattern.bounds();
        // 使用坐标查找按键
        let oX = rect.left, oY = rect.top; // 第一个点位置
        let w = (rect.right - rect.left) / pattern_size, h = (rect.bottom - rect.top) / pattern_size; // 2点之单间隔为边框的1/3
        let points = [];

        points[0] = {
            x: 0,
            y: 0
        };
        // 初始化每个点的坐标
        for (let i = 1; i <= pattern_size; i++) {
            for (let j = 1; j <= pattern_size; j++) {
                let row = i - 1;
                let col = j - 1;
                let index = pattern_size * (i - 1) + j; // 序号，从1开始
                points[index] = {
                    x: oX + col * w + w / 2,
                    y: oY + row * h + h / 2
                };
            }
        }

        // 使用手势解锁
        let gestureParam = [100 * len];
        for (let i = 0; i < len; i++) {
            let point = points[password[i]];

            gestureParam.push([point.x, point.y]);
        }
        gestures(gestureParam);

        return this.checkUnlock();
    };

    this.unlockPassword = function (password) {
        if (typeof password !== "string") {
            password = password.join("");
        }
        setText(0, password); // 输入密码
        let confirm;
        if (confirm = text("确认").findOnce()) {
            confirm.click();
        } else {
            KeyCode("KEYCODE_ENTER"); // 按Enter
        }

        sleep(1500);
        return this.checkUnlock();
    };
}