function normalizeRestFactoryConfig(spec, wire) {
	var config = {};

	config.parent = wire(spec.parent || client);
	config.interceptors = when.all((Array.isArray(spec) ? spec : spec.interceptors || []).map(function (interceptorDef) {
		var interceptorConfig = interceptorDef.config;
		delete interceptorDef.config;
		return when.all([
			wire(typeof interceptorDef === 'string' ? { module: interceptorDef } : interceptorDef),
			wire(interceptorConfig)
		]).spread(function (interceptor, config) {
			return { interceptor: interceptor, config: config };
		});
	}));

	return config;
}