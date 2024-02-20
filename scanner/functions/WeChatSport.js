function WeChatSport(robot, options) {
    this.robot = robot;
    options = options || {};
    var settings = {
        timeout: 6000,
        max_retry_times: 10,
        min_step_count: 0,
    };
    this.options = Object.assign(settings, options);
    this.package = "com.tencent.mm";
    this.activity = "com.tencent.mm.plugin.exdevice.ui.ExdeviceRankInfoUI";
    this.btns1 = ["微信", "微信运动", "步数排行榜"];
    this.btns2 = ["我", "设置", "通用", "辅助功能", "微信运动", "进入微信运动", "步数排行榜"];
    this.step = 0;

    this.launch = function () {
        toastLog("即将进入微信运动，按Home键停止");
        this.step = this.btns1.length;
        if (this.doLaunch(this.btns1)) {
            return true;
        }

        toastLog("首页查找按钮失败，尝试方案二");
        this.robot.kill(this.package);
        this.step = this.btns2.length - 1;
        for (var i = 0; i < this.options.max_retry_times; i++) {
            if (this.doLaunch(this.btns2)) {
                return true;
            }
        }

        toastLog("进入失败");
        exit();
        return false;
    };

    this.doLaunch = function (btns) {
        launch("com.tencent.mm");

        do {
            var btn;
            if (btn = text(btns[0]).visibleToUser(true).findOne(this.options.timeout)) {
                this.robot.clickCenter(btn);
                btns.shift();
                sleep(500);
            } else {
                toastLog("进入" + btns[0] + "页面失败");
                return false;
            }
        } while (btns.length > 0);

        return this.isRank();
    };

    this.work = function () {
        toastLog("开始点赞");

        do {
            className("android.widget.ImageView").depth(17).visibleToUser(true).filter(function (o) {
                return 1 === o.indexInParent();
            }).find().forEach(function (o) {
                var btn = o.parent().parent();
                btn.click();

                if (btn.parent()) {
                    var step_count = btn.parent().findOne(textMatches(/\d+/)).text(); // 当前好友的步数
                    if (step_count <= this.options.min_step_count) {
                        return;
                    }
                }

                // 若是误点进入了详情，后退
                if (!this.isRank()) {
                    this.back();
                    sleep(500);
                }
            }.bind(this));

            sleep(2000);
        } while (this.nextPage());

        // 返回主界面
        for (var i = 0; i < this.step; i++) {
            this.back();
            sleep(500);
        }

        toast("执行完毕");
    };

    this.isRank = function () {
        sleep(200);
        return currentActivity() === this.activity;
    }

    this.nextPage = function () {
        return packageName(this.package).className("android.widget.ListView").scrollDown();
    };

    this.back = function () {
        var y = device.height / 2;
        this.robot.swipe(0, y, 100, y, 10);
    }
}