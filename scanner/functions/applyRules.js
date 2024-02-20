function applyRules(content, editable) {
		var doc = editable.ownerDocument;
		var container = doc.createElement('div');
		container.innerHTML = content;
		var node = Dom.forward(container);
		while (node) {
			//skip over node if it is a aloha-block, because we want to keep elements inside
			if ($(node).hasClass('aloha-block')) {
				node = Dom.forward(node, true);
			} else {
				var translation = translate(editable, node.nodeName);
				if (translation !== node.nodeName) {
					var replacement = doc.createElement(translation);
					replacement.innerHTML = node.innerHTML;
					node.parentNode.replaceChild(replacement, node);
					node = replacement;
				}
				if (isAllowed(editable, node.nodeName)) {
					node = Dom.forward(node);
				} else if (GROUP_CONTAINERS[node.nodeName] || GROUPED_ELEMENTS[node.nodeName]) {
					// Because `node` is being entirely removed, we skip over, and
					// do not descend its subtree
					var prev = Dom.backward(node);
					node.parentNode.removeChild(node);
					node = Dom.forward(prev);
				} else {
					var next = Dom.forward(node);
					Dom.removeShallow(node);
					node = next;
				}
			}
		}
		return container.innerHTML;
	}