function findTagInRangeTreeRecursion(array, tagName, objs) {
		var element,
			i,
			len = array.length;
		for (i = 0; i < len; i++) {
			element = array[i];
			if (element.type !== 'none' && element.type !== 'collapsed') {
				if (element.domobj.nodeName === tagName) {
					objs.push(element.domobj);
				}
				if (element.children.length > 0) {
					findTagInRangeTreeRecursion(element.children, tagName, objs);
				}
			}
		}
	}