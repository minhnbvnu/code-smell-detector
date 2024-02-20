function replaceWordNewLines($content) {
		var i;
		var $nodes = $content.contents();
		var node;

		for (i = 0; i < $nodes.length; i++) {
			node = $nodes[i];

			if (Node.TEXT_NODE === node.nodeType) {
				var text = node.nodeValue;
				node.nodeValue = text.replace(/[\r\n]+/gm, ' ');
			} else {
				replaceWordNewLines($nodes.eq(i));
			}
		}
	}