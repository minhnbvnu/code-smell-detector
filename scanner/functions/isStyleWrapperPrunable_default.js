function isStyleWrapperPrunable_default(node) {
		return ('SPAN' === node.nodeName
				&& Arrays.every(Arrays.map(Dom.attrs(node), Arrays.second),
								Strings.empty));
	}