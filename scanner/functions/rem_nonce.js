function rem_nonce(text) {
	return text.replace(/nonce: "[0-9a-z]+" \/\/ imu:nonce = .*/, "");
}