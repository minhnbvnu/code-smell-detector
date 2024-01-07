function getPossiblePresetNames(presetName) {
	  var possibleNames = ["babel-preset-" + presetName, presetName];

	  var matches = presetName.match(/^(@[^/]+)\/(.+)$/);
	  if (matches) {
	    var orgName = matches[1],
	        presetPath = matches[2];

	    possibleNames.push(orgName + "/babel-preset-" + presetPath);
	  }

	  return possibleNames;
	}