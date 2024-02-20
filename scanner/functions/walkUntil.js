function walkUntil(node, fn, until, arg) {
		while (node && !until(node, arg)) {
			var next = node.nextSibling;
			fn(node, arg);
			node = next;
		}
	}