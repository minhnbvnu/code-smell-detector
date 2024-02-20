function combineToolbarSettings(userTabs, defaultTabs, exclude) {
		var defaultTabsByLabel = Maps.fillTuples({}, Arrays.map(defaultTabs, function(tab) {
			return [tab.label, tab];
		}));
		var exclusionLookup = makeExclusionMap(userTabs, exclude);
		function pruneDefaultComponents(form) {
			return 'array' === $.type(form) ? !form.length : exclusionLookup[form];
		}
		userTabs = mergeDefaultComponents(userTabs, defaultTabsByLabel, pruneDefaultComponents);
		defaultTabs = remainingDefaultTabs(defaultTabs, exclusionLookup, pruneDefaultComponents);
		return userTabs.concat(defaultTabs);
	}