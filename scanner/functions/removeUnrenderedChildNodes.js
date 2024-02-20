function removeUnrenderedChildNodes($content) {
		var childNodes = $content[0].childNodes;
		var i;
		var len;

		for (i = 0, len = childNodes.length; i < len; i++) {
			if (childNodes[i] && Html.isUnrenderedNode(childNodes[i])) {
				$content[0].removeChild(childNodes[i]);
			}
		}
	}