function prepareUi(plugin) {
		FIELD = attributeField({
			name: 'wailangfield',
			width: 320,
			valueField: 'id',
			minChars: 1,
			scope: 'Aloha.continuoustext'
		});

		plugin._wailangButton = Ui.adopt('wailang', ToggleButton, {
			tooltip: i18n.t('button.add-wai-lang.tooltip'),
			icon: 'aloha-icon aloha-icon-wai-lang',
			scope: 'Aloha.continuoustext',
			click: toggleAnnotation
		});

		removeButton = Ui.adopt('removewailang', Button, {
			tooltip: i18n.t('button.add-wai-lang-remove.tooltip'),
			icon: 'aloha-icon aloha-icon-wai-lang-remove',
			scope: 'Aloha.continuoustext',
			click: function onButtonClick() {
				removeMarkup(Selection.getRangeObject());
			}
		});

		FIELD.setTemplate(plugin.flags
				? '<div class="aloha-wai-lang-img-item">' +
				  '<img class="aloha-wai-lang-img" src="{url}" />' +
				  '<div class="aloha-wai-lang-label-item">{name} ({id})</div>' +
				  '</div>'
				: '<div class="aloha-wai-lang-img-item">' +
				  '<div class="aloha-wai-lang-label-item">{name} ({id})</div>' +
				  '</div>'
			);

		FIELD.setObjectTypeFilter(plugin.objectTypeFilter);
	}