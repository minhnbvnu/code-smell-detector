function _merge_arrays_uniq() {
		var result = [],
		    uniq_hash = {},
			i,
		    len = arguments.length,
		    arg;
		for (i = 0; i < len; i++) {
			arg = arguments[i];
			if (!arg || !arg.length)
				continue;
			for (var j = 0, argLen = arg.length; j < argLen; j++) {
				if (uniq_hash[arg[j]])
					continue;
				uniq_hash[arg[j]] = true;
				result.push(arg[j]);
			}
		}
		return result;
	}