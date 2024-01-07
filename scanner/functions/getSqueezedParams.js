function getSqueezedParams(params, keptDims) {
	  return keptDims.map(function (d) {
	    return params[d];
	  }).join(', ');
	}