function toggle_enabled() {
    get_option("imu_enabled", function(value) {
        set_option("imu_enabled", !value);
        update_logo(!value);
    }, true);
}