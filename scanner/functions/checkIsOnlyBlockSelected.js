function checkIsOnlyBlockSelected(selection) {
				if (selection.getRangeCount() === 0) {
					return true;
				}
				if (!$.browser.msie) {
					return false;
				}
				var range = selection.getRangeAt(0);
				var sc = range.startContainer;
				var ec = range.endContainer;
				if (sc !== ec) {
					return false;
				}
				// IE has placed the selection on the body element
				if ($('body').is(sc)) {
					return true;
				}
				// IE has placed the selection around the selected block?
				if (range.startOffset + 1 === range.endOffset && 1 === node.nodeType) {
					var node = node.childNodes[range.startOffset];
					return $(node).is('.aloha-block');
				}
				return false;
			}