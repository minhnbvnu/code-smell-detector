function parseArgs(args) {
	  return args.map(function (val) {
	    if (val != null && val.inspect) {
	      return val.inspect();
	    } else {
	      try {
	        return (0, _stringify2.default)(val) || val + "";
	      } catch (e) {
	        return util.inspect(val);
	      }
	    }
	  });
	}