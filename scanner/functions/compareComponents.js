function compareComponents(a, b) {
	  var _normalizeVersions = normalizeVersions(a, b),
	      aNormalized = _normalizeVersions[0],
	      bNormalized = _normalizeVersions[1];

	  for (var i = 0; i < bNormalized.length; i++) {
	    var result = compareNumeric(aNormalized[i], bNormalized[i]);
	    if (result) {
	      return result;
	    }
	  }

	  return 0;
	}