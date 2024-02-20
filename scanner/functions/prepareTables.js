function prepareTables($content) {
		// Because Aloha does not provide a way for the editor to
		// manipulate borders, cellspacing, cellpadding in tables.
		// @todo what about width, height?
		$content.find('table')
			.removeAttr('cellpadding')
			.removeAttr('cellspacing')
			.removeAttr('border')
			.removeAttr('border-top')
			.removeAttr('border-bottom')
			.removeAttr('border-left')
			.removeAttr('border-right');

		$content.find('td').each(function () {
			var td = this;

			// Because cells with a single empty <p> are rendered to appear
			// like empty cells, it simplifies the handeling of cells to
			// normalize these table cells to contain actual white space
			// instead.
			if (Utils.isProppedParagraph(td.innerHTML)) {
				td.innerHTML = '&nbsp;';
			}

			// Because a single <p> wrapping the contents of a <td> is
			// initially superfluous and should be stripped out.
			var $p = $('>p', td);
			if (1 === $p.length) {
				$p.contents().unwrap();
			}
		});

		// Because Aloha does not provide a means for editors to manipulate
		// these properties.
		$content.find('table,th,td,tr')
			.removeAttr('width')
			.removeAttr('height')
			.removeAttr('valign');

		// Because Aloha table handling simply does not regard colgroups.
		// @TODO Use sanitize.js?
		$content.find('colgroup').remove();
	}