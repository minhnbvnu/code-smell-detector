function MIUISecure(secure) {
    this.__proto__ = secure;

    this.hasLayer = function () {
        return id("com.android.keyguard:id/unlock_screen_sim_card_info").exists() 
        || id("com.android.keyguard:id/miui_unlock_screen_digital_clock").exists() 
        || id("com.android.keyguard:id/miui_porch_notification_and_music_control_container").exists()
        || id("com.android.keyguard:id/notification_message_view").exists();
    };

    this.unlock = function (password, pattern_size) {
        let len = password.length;
        
        if (id("com.android.keyguard:id/lockPattern").exists()) {
            return this.unlockPattern(password, len, pattern_size);
        } else if (id("com.android.keyguard:id/miui_mixed_password_input_field").exists()) {
            return this.unlockPassword(password);
        } else if (id("com.android.keyguard:id/numeric_inputview").exists()) {
            return this.unlockKey(password, len);
        } else {
            toastLog("识别锁定方式失败，型号：" + device.brand + " " + device.product + " " + device.release);
            return this.checkUnlock();
        }
    };

    this.unlockKey = function (password, len) {
        for (let j = 0; j < len; j++) {
            let btn = id("com.android.keyguard:id/numeric_inputview").findOne(1000).findOne(text(password[j]));
            if (btn) {
                this.robot.clickCenter(btn);
            } else {
                return false;
            }
        }

        return this.checkUnlock();
    };

    this.unlockPattern = function (password, len, pattern_size) {
        let pattern = id("com.android.keyguard:id/lockPattern").findOne(1000);
        return this.gestureUnlock(pattern, password, len, pattern_size);
    };

    this.checkUnlock = function () {
        sleep(1500); // 等待动画
        if (id("com.android.keyguard:id/phone_locked_textview").exists()) {
            toastLog("密码错误");
            return this.failed();
        }

        return !this.isLocked();
    };
}