function momentPluginFactory($store) {
	return createPlugin({
		name: '@nextcloud/moment-plugin',
		cmdFormatter: cmdFormatterFactory($store),
	})
}