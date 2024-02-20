function publishPastedLinks(frag) {
		var children = frag.childNodes;
		var links;
		var c;
		var i;
		var len;

		for (c = 0; c < children.length; c++) {
			links = jQuery(children[c]).find('a');
			for (i = 0, len = links.length; i < len; i++) {
				PubSub.pub('aloha.link.pasted', {
					href: links[i].getAttribute('href'),
					element: links[i]
				});
			}
		}
	}