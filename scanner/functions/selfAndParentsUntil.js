function selfAndParentsUntil(container, limit) {
		var parents = [],
			cur;
		if (1 === container.nodeType) {
			cur = container;
		} else {
			cur = container.parentNode;
		}
		for (;;) {
			if (!cur || cur === limit || 9 === cur.nodeType) {
				break;
			}
			if (1 === cur.nodeType) {
				parents.push(cur);
			}
			cur = cur.parentNode;
		}
		return parents;
	}