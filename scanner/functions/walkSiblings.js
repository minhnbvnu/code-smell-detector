function walkSiblings(parent, beforeAfterChild, before, at, after, arg) {
		var fn = before;
		Dom.walk(parent.firstChild, function (child) {
			if (child !== beforeAfterChild) {
				fn(child, arg);
			} else {
				fn = after;
				at(child, arg);
			}
		});
	}