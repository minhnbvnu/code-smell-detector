function getChangedContext(node, context) {
		var until = Aloha.activeEditable ? Aloha.activeEditable.obj.parent()[0] : null;
		var parents = jQuery(node).parentsUntil(until).get();
		var html = makeContextHtml(node, parents);
		var equal = (context && node === context.node && Arrays.equal(context.parents, parents) && html === context.html);
		return equal ? null : {
			node: node,
			parents: parents,
			html: html
		};
	}