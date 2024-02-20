function requireHook(options, ext) {
	// register ._js extension
	return function(module, filename) {
		var opts = util.extend({}, options);
		opts.filename = filename;
		opts.ext = ext;
		var js = transformFileSync(filename, opts).code;
		module._compile(js, filename);
	}
}