function parseSuffixes (name) {
		// creates a dual-structure: both an array and a hashmap
		// suffixes[0] is the actual name
		var parts = name.split('!'),
			suf, i = 1, pair;
		while ((suf = parts[i++])) { // double-parens to avoid jslint griping
			pair = suf.split('=', 2);
			parts[pair[0]] = pair.length == 2 ? pair[1] : true;
		}
		return parts;
	}