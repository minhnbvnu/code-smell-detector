function markAttr(elem, attr) {
		elem = $(elem);
		var data = elem.attr('data-aloha-ephemera-attr');
		if (null == data || '' === data) {
			data = attr;
		} else if (-1 === Arrays.indexOf(Strings.words(data), attr)) {
			data += ' ' + attr;
		}
		elem.attr('data-aloha-ephemera-attr', data);
		elem.addClass('aloha-ephemera-attr');
	}