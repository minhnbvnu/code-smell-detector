function isRangeVisiblyAtRightBoundary(range) {
			var offset = range.startOffset;
			var node = range.startContainer;
			if (Dom.nodeLength(node) === offset) {
				return true;
			}
			if (1 === node.nodeType) {
				return !Html.findNodeLeft(
					node.childNodes[offset - 1],
					isNotUnrenderedNode
				);
			}
			if (3 === node.nodeType) {
				return Html.isWSPorZWSPText(node.data.substr(offset));
			}
			return false;
		}