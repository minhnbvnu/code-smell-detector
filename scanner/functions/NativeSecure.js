function NativeSecure(secure) {
    this.__proto__ = secure;

    this.hasLayer = function () {
        return id("com.android.systemui:id/clock_view").visibleToUser(true).exists(); // 是否有上滑图层
    };

    this.unlock = function (password, pattern_size) {
        let len = password.length;

        if (id("com.android.systemui:id/lockPatternView").exists()) {
            return this.unlockPattern(password, len, pattern_size);
        } else if (id("com.android.systemui:id/passwordEntry").exists()) {
            return this.unlockPassword(password);
        } else if (id("com.android.systemui:id/pinEntry").exists()) {
            return this.unlockKey(password, len);
        } else {
            toastLog("识别锁定方式失败，型号：" + device.brand + " " + device.product + " " + device.release);
            return this.checkUnlock();
        }
    };

    this.unlockKey = function (password, len) {
        for (let j = 0; j < len; j++) {
            let key_id = "com.android.systemui:id/key" + password[j];
            if (!id(key_id).exists()) {
                return false;
            }
            id(key_id).findOne(1000).click();
        }
        if (id("com.android.systemui:id/key_enter").exists()) {
            id("com.android.systemui:id/key_enter").findOne(1000).click();
        }

        return this.checkUnlock();
    };

    this.unlockPattern = function (password, len, pattern_size) {
        let pattern = id("com.android.systemui:id/lockPatternView").findOne(1000);
        return this.gestureUnlock(pattern, password, len, pattern_size);
    };

    this.checkUnlock = function () {
        sleep(1500); // 等待动画
        if (id("android:id/message").textContains("重试").exists()) {
            toastLog("密码错误");
            return this.failed();
        }

        return !this.isLocked();
    };
}