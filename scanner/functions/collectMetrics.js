function collectMetrics(metrics, outputNames) {
	  if (metrics == null || Array.isArray(metrics) && metrics.length === 0) {
	    return outputNames.map(function (name) {
	      return [];
	    });
	  }

	  var wrappedMetrics;

	  if (typeof metrics === 'string' || typeof metrics === 'function') {
	    wrappedMetrics = [metrics];
	  } else if (Array.isArray(metrics) || typeof metrics === 'object') {
	    wrappedMetrics = metrics;
	  } else {
	    throw new TypeError('Type of metrics argument not understood. Expected an string,' + ("function, Array, or Object, found: " + metrics));
	  }

	  if (Array.isArray(wrappedMetrics)) {
	    // We then apply all metrics to all outputs.
	    return outputNames.map(function (name) {
	      return wrappedMetrics;
	    });
	  } else {
	    // In this case, metrics is a dict.
	    var nestedMetrics = [];

	    for (var _iterator2 = _createForOfIteratorHelperLoose(outputNames), _step2; !(_step2 = _iterator2()).done;) {
	      var name = _step2.value;
	      var outputMetrics = wrappedMetrics.hasOwnProperty(name) ? wrappedMetrics[name] : [];

	      if (!Array.isArray(outputMetrics)) {
	        outputMetrics = [outputMetrics];
	      }

	      nestedMetrics.push(outputMetrics);
	    }

	    return nestedMetrics;
	  }
	}