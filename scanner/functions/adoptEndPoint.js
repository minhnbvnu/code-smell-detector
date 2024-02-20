function adoptEndPoint(textRange, domRange, bStart) {
					// find anchor node and offset
					var container = domRange[bStart ? 'startContainer' : 'endContainer'],
						offset = domRange[bStart ? 'startOffset' : 'endOffset'],
						textOffset = 0,
						anchorNode = DOMUtils.isDataNode(container) ? container : container.childNodes[offset],
						anchorParent = DOMUtils.isDataNode(container) ? container.parentNode : container,
						cursorNode, cursor;

					// visible data nodes need a text offset
					if (container.nodeType == 3 || container.nodeType == 4) {
						textOffset = offset;
					}

					// create a cursor element node to position range (since we can't select text nodes)
					cursorNode = domRange._document.createElement('a');
					anchorParent.insertBefore(cursorNode, anchorNode);
					cursor = domRange._document.body.createTextRange();
					cursor.moveToElementText(cursorNode);
					cursorNode.parentNode.removeChild(cursorNode);
					// move range
					textRange.setEndPoint(bStart ? 'StartToStart' : 'EndToStart', cursor);
					textRange[bStart ? 'moveStart' : 'moveEnd']('character', textOffset);
				}