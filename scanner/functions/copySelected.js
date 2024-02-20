async function copySelected(selection, root) {
	if (!checkXDVersion()) { return; }
	let xdNode = $.getSelectedItem(selection);
	if (!xdNode) { alert("Select a single item to copy."); return; }
	let type = NodeType.getType(xdNode);
	let isCopyable = type !== NodeType.ROOT && type !== NodeType.WIDGET;
	if (!isCopyable) {
		alert("The selected item cannot be copied.");
		return null;
	}

	let ctx = new Context(ContextTarget.CLIPBOARD);

	let result, node = parse(root, xdNode, ctx);
	if (node) {
		node.layout.enabled = false;
		result = _formatDart(node.serialize(ctx)+';', true, ctx);
	}

	if (result && result.length > 1) {
		result = result.slice(0, -1); // strip off trailing ';'
		clipboard.copyText(result);
		ctx.resultMessage = "Flutter code copied to clipboard";
	} else {
		ctx.resultMessage = "Unable to export this node";
	}
	
	ctx.log.dump(ctx.resultMessage);
	return ctx;
}