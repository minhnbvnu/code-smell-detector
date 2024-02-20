function replace_vars(line) {
	return line
		.replace(/__IMU_NONCE__/g, JSON.stringify(nonce))
		.replace(/__IMU_GETBIGIMAGE__/g, "$__imu_get_bigimage");
}