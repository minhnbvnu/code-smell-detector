function isUnmodifiedAlohaEditingP(node) {
		return Browser.ie
		       ? (node.className === 'aloha-editing-p aloha-placeholder'
		         && node.children.length === 0
		         && (!node.firstChild || node.firstChild.data === '\u2060'))
		       : (node.className === 'aloha-editing-p aloha-placeholder'
		         && node.children.length >= 1
		         && node.children[0].nodeName === 'BR'
		         && node.children[0].className === 'aloha-end-br');
	}