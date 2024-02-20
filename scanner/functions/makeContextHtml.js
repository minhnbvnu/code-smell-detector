function makeContextHtml(node, parents) {
		var result = [],
			parent,
			len,
			i;
		if (1 === node.nodeType && node.nodeName !== 'BODY' && node.nodeName !== 'HTML') {
			result.push(node.cloneNode(false).outerHTML);
		} else {
			result.push('#' + node.nodeType);
		}
		for (i = 0, len = parents.length; i < len; i++) {
			parent = parents[i];
			if (parent.nodeName === 'BODY' || parent.nodeName === 'HTML') {
				// Although we limit the ancestors in most cases to the
				// active editable, in some cases (copy&paste) the
				// parent may be outside.
				// On IE7 this means the following code may clone the
				// HTML node too, which causes the browser to crash.
				// On other browsers, this is just an optimization
				// because the body and html elements should probably
				// not be considered part of the context of an edit
				// operation.
				break;
			}
			result.push(parent.cloneNode(false).outerHTML);
		}
		return result.join('');
	}