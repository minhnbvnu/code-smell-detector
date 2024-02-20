function indexByName(root, names) {
		var i,
		    index = {},
		    len;
		for (i = 0, len = names.length; i < len; i++) {
			var name = names[i];
			index[name] = $.makeArray(root.getElementsByTagName(name));
		}
		return index;
	}