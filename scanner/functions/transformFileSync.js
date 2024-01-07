function transformFileSync(filename) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  opts.filename = filename;
	  return transform(_fs2.default.readFileSync(filename, "utf8"), opts);
	}