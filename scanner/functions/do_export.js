function do_export() {
		$$IMU_EXPORT$$ = bigimage_recursive;
		if (is_node) {
			module.exports = bigimage_recursive;
		} else if (is_scripttag) {
			imu_variable = bigimage_recursive;
		}
	}