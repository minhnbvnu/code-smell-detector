function transformFile(filename, opts, callback) {
	  if (typeof opts === "function") {
	    callback = opts;
	    opts = {};
	  }

	  opts.filename = filename;

	  _fs2.default.readFile(filename, function (err, code) {
	    var result = void 0;

	    if (!err) {
	      try {
	        result = transform(code, opts);
	      } catch (_err) {
	        err = _err;
	      }
	    }

	    if (err) {
	      callback(err);
	    } else {
	      callback(null, result);
	    }
	  });
	}