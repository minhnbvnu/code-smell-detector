function ascendWalkSiblings(ascendNodes, atEnd, carryDown, before, at, after, arg) {
		var i;
		var args = [];
		i = ascendNodes.length;
		while (i--) {
			arg = carryDown(ascendNodes[i], arg) || arg;
			args.push(arg);
		}
		args.reverse();
		// Because with end positions like
		// <elem>text{</elem> or <elem>text}</elem>
		// ascendecending would start at <elem> ignoring "text".
		if (ascendNodes.length && atEnd) {
			Dom.walk(ascendNodes[0].firstChild, before, args[0]);
		}
		for (i = 0; i < ascendNodes.length - 1; i++) {
			var child = ascendNodes[i];
			var parent = ascendNodes[i + 1];
			walkSiblings(parent, child, before, at, after, args[i + 1]);
		}
	}