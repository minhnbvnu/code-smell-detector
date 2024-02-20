function generateCharacterTable(overlay, characters) {
		var textarea = document.createElement('textarea');
		textarea.innerHTML = characters;

		var list = $.grep(textarea.value.split(' '), function (chr) {
			return '' !== chr;
		});

		var table = ['<tr>'];
		var i = 0;
		var chr;
		while ((chr = list[i])) {
			// New row every 15 characters
			if (0 !== i && (0 === (i % 15))) {
				table.push('</tr><tr>');
			}
			table.push('<td unselectable="on">' + chr + '</td>');
			i++;
		}
		table.push('</tr>');

		overlay.$tbody.empty().append(table.join(''));

		overlay.$element.delegate('td', 'mouseover', function () {
			overlay.$element.find('.focused').removeClass('focused');
			$(this).addClass('focused');
		}).delegate('td', 'mouseout', function () {
			$(this).removeClass('focused');
		}).delegate('td', 'click', function () {
			overlay.$element.hide();
			overlay.onSelect($(this).text());
		});
	}