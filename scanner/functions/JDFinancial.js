function JDFinancial(robot, options) {
    this.robot = robot;
    options = options || {};
    var settings = {
        timeout: 12000,
        max_retry_times: 10
    };
    this.options = Object.assign(settings, options);
    this.package = "com.jd.jrapp";

    this.openApp = function () {
        toastLog("即将签到，按音量上键停止");

        launch(this.package);
    };

    this.closeApp = function () {
        this.robot.kill(this.package);
    };

    this.launch = function () {
        var times = 0;
        do {
            if (this.doLaunch()) {
                return;
            } else {
                times++;
                this.closeApp();
                this.openApp();
            }
        } while (times < this.options.max_retry_times);

        toastLog("运行失败");
        engines.stopAll();
        exit();
    };

    this.doLaunch = function () {
        sleep(1000);
        var jump = text("跳过");
        if (jump.exists()) {
            jump.findOnce().click();
        }

        var me;
        if (me = id("tv_fourth_icon").text("我").findOne(this.options.timeout)) {
            return me.parent().click();
        } else {
            return false;
        }
    };

    this.work = function () {
        var success = false;
        for (var times = 0;times < this.options.max_retry_times;times++) {
            if (this.signIn()) {
                success = true;
                toastLog("签到成功");
                break;
            }
        }

        if (!success) {
            toastLog("签到失败");
        }

        return false;
    };

    this.signIn = function() {
        if (id("tv_item_label").textMatches(/已签\d+天/).exists()) return true;

        var sign_in = text("签到");
        if (!sign_in.exists()) return false;

        if (!sign_in.findOnce().parent().click()) return false;

        sleep(3000);

        var btn;
        var success;
        if (btn = desc("签到领钢镚").findOne(this.options.timeout)) {
            success = btn.click();
        } else {
            success = false;
        }

        this.robot.back();
        sleep(1500);

        return success;
    };
}