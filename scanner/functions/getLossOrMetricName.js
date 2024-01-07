function getLossOrMetricName(fn) {
	  assert$1(fn !== null, "Unknown LossOrMetricFn " + fn);

	  if (typeof fn === 'string') {
	    return fn;
	  } else {
	    var fnName;

	    for (var _i = 0, _Object$keys = Object.keys(lossesMap); _i < _Object$keys.length; _i++) {
	      var key = _Object$keys[_i];

	      if (lossesMap[key] === fn) {
	        fnName = key;
	        break;
	      }
	    }

	    if (fnName !== undefined) {
	      return fnName;
	    }

	    for (var _i2 = 0, _Object$keys2 = Object.keys(metricsMap); _i2 < _Object$keys2.length; _i2++) {
	      var _key = _Object$keys2[_i2];

	      if (metricsMap[_key] === fn) {
	        fnName = _key;
	        break;
	      }
	    }

	    if (fnName !== undefined) {
	      return fnName;
	    }

	    return fn.name;
	  }
	}