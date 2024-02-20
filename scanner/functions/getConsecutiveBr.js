function getConsecutiveBr(node) {
		var brs = [];

		jQuery(node).find('BR').each(function() {
			var node = Html.findNodeLeft(this.nextSibling, function (node) {
				return (Html.isRenderedNode(node) && !Dom.isEmpty(node)) || node.nodeName === 'BR';
			});

			if ((node && node.nodeName === 'BR') || isFirstChild(this)) {
				brs.push(this);
			}
		});

		return brs;
	}