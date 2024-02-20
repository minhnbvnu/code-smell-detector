function isRangeVisiblyAtLeftBoundary(range) {
			var offset = range.startOffset;
			var node = range.startContainer;
			if (0 === offset) {
				return true;
			}
			if (1 === node.nodeType) {
				return !Html.findNodeRight(
					node.childNodes[offset - 1],
					isNotUnrenderedNode
				);
			}
			if (3 === node.nodeType) {
				return Html.isWSPorZWSPText(node.data.substr(0, offset));
			}
			return false;
		}