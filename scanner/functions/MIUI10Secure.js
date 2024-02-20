function MIUI10Secure(secure) {
    this.__proto__ = secure;
    this.secure = new NativeSecure(secure);

    this.hasLayer = function () {
        return id("com.android.systemui:id/awesome_lock_screen_container").exists() 
        || id("com.android.systemui:id/notification_container_parent").exists() 
        || id("com.android.systemui:id/keyguard_header").exists()
        || id("com.android.systemui:id/keyguard_carrier_text").exists()
        || id("com.android.systemui:id/notification_panel").exists();
    };

    this.unlock = function (password, pattern_size) {
        return this.secure.unlock(password, pattern_size);
    };
}