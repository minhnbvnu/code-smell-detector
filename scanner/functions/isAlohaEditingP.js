function isAlohaEditingP(node) {
		return (
			node.className === 'aloha-editing-p'
				&& nodeLength(node) === 1
					&& node.children[0].nodeName === 'BR'
						&& node.children[0].className === 'aloha-end-br'
		);
	}