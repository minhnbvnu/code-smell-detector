function isProppedParagraph(html) {
		var trimmed = $.trim(html);
		if (!trimmed) {
			return false;
		}
		var div = $('<div>' + trimmed + '</div>')[0];
		var first = div.firstChild;
		var containsSingleP = first === div.lastChild && 'P' === first.nodeName;
		if (!containsSingleP) {
			return false;
		}
		var $visible = $(first.childNodes).filter(function (i, node) {
			return Html.isRenderedNode(node);
		});
		return $visible.length === 1 && $visible[0].nodeName === 'BR';
	}