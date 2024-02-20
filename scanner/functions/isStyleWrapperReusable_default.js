function isStyleWrapperReusable_default(node) {
		return 'SPAN' === node.nodeName && !Html.isEditingHost(node);
	}