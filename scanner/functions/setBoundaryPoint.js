function setBoundaryPoint(marker, node) {
			var setFn;
			if (0 === markersFound) {
				setFn = 'setStart';
				if (marker !== '[' && marker !== '{') {
					throw "end marker before start marker";
				}
			} else if (1 === markersFound) {
				setFn = 'setEnd';
				if (marker !== ']' && marker !== '}') {
					throw "start marker before end marker";
				}
			} else {
				throw "Too many markers";
			}
			markersFound += 1;
			if (marker === '[' || marker === ']') {
				var previousSibling = node.previousSibling;
				if (!previousSibling || 3 !== previousSibling.nodeType) {
					previousSibling = document.createTextNode('');
					node.parentNode.insertBefore(previousSibling, node);
				}
				range[setFn].call(range, previousSibling, previousSibling.length);
				// Because we have set a text offset.
				return false;
			} else { // marker === '{' || marker === '}'
				range[setFn].call(range, node.parentNode, Dom.nodeIndex(node));
				// Because we have set a non-text offset.
				return true;
			}
		}