function buildConfigChain() {
	  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var log = arguments[1];

	  var filename = opts.filename;
	  var builder = new ConfigChainBuilder(log);

	  if (opts.babelrc !== false) {
	    builder.findConfigs(filename);
	  }

	  builder.mergeConfig({
	    options: opts,
	    alias: "base",
	    dirname: filename && _path2.default.dirname(filename)
	  });

	  return builder.configs;
	}