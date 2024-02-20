function initializeTemplates(plugin) {
		if (plugin.templates.dl) {
			$.each(plugin.templates.dl.classes, function (i, cssClass) {
				plugin.definitionListStyleButtons.push(plugin.makeListStyleButton('dl', cssClass));
			});

			plugin._definitionListFormatSelectorButton = Ui.adopt(
				'definitionListFormatSelector',
				MenuButton,
				{
					click: function () {
						plugin.transformList('dl');
					},
					html: '<span class="ui-button-icon-primary ui-icon aloha-icon aloha-icon-definitionlist"></span>',
					menu: (plugin.definitionListStyleButtons.length) ? plugin.definitionListStyleButtons : null
				}
			);
		}

		if (plugin.templates.ol) {
			$.each(plugin.templates.ol.classes, function (i, cssClass) {
				plugin.orderedListStyleButtons.push(plugin.makeListStyleButton('ol', cssClass));
			});

			plugin._orderedListFormatSelectorButton = Ui.adopt(
				'orderedListFormatSelector',
				MenuButton,
				{
					click: function () {
						plugin.transformList('ol');
					},
					html: '<span class="ui-button-icon-primary ui-icon aloha-icon aloha-icon-orderedlist"></span>',
					menu: (plugin.orderedListStyleButtons.length) ? plugin.orderedListStyleButtons : null
				}
			);
		}

		if (plugin.templates.ul) {
			$.each(plugin.templates.ul.classes, function (i, cssClass) {
				plugin.unorderedListStyleButtons.push(plugin.makeListStyleButton('ul', cssClass));
			});

			plugin._unorderedListFormatSelectorButton = Ui.adopt(
				'unorderedListFormatSelector',
				MenuButton,
				{
					click: function () {
						plugin.transformList('ul');
					},
					html: '<span class="ui-button-icon-primary ui-icon aloha-icon aloha-icon-unorderedlist"></span>',
					menu: (plugin.unorderedListStyleButtons.length) ? plugin.unorderedListStyleButtons : null
				}
			);
		}
	}