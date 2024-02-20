function replaceNewlines($content) {
		$content.contents().each(function (index, node) {
			if (3 === node.nodeType) {
				node.nodeValue = node.nodeValue.replace(/[\r\n]+/gm, ' ');
			} else {
				replaceNewlines($(node));
			}
		});
	}