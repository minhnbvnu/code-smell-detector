function pushDown(node, stop) {
				if (stop) {
					return;
				}
				if (!wrapper || node.parentNode.previousSibling !== wrapper) {
					wrapper = clone(node.parentNode);
					insertAdjust(wrapper, node.parentNode, false, leftPoint, rightPoint);
				}
				insertAdjust(node, wrapper, true, leftPoint, rightPoint);
			}