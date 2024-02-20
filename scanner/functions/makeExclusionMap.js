function makeExclusionMap(userTabs, exclude) {
		var i,
		    map = Maps.fillKeys({}, exclude, true);
		for (i = 0; i < userTabs.length; i++) {
			map[userTabs[i].label] = true;
			Maps.fillKeys(map, Trees.flatten(userTabs[i].components), true);
		}
		return map;
	}