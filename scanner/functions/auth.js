function auth(authPluginName, password, seed) {
	switch (authPluginName) {
		case 'mysql_native_password':
			return mysqlNativePassword(password, seed);
		case 'caching_sha2_password':
			return cachingSha2Password(password, seed);
		default:
			throw new Error('Not supported');
	}
}