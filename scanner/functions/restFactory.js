function restFactory(resolver, spec, wire) {
	var config = normalizeRestFactoryConfig(spec.rest || spec.options, wire);
	return config.parent.then(function (parent) {
		return config.interceptors.then(function (interceptorDefs) {
			pipeline(interceptorDefs.map(function (interceptorDef) {
				return function (parent) {
					return interceptorDef.interceptor(parent, interceptorDef.config);
				};
			}), parent).then(resolver.resolve, resolver.reject);
		});
	});
}