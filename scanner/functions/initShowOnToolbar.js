function initShowOnToolbar(plugin) {
		plugin.removeCiteButton = Ui.adopt("removeCite", ToggleButton, {
			tooltip: i18n.t("button.removeCite.tooltip"),
			icon: "aloha-icon aloha-icon-unlink",
			scope: 'Aloha.continuoustext',
			click: function () {
				plugin.removeQuote();
			}
		});

		plugin.citeHrefField = AttributeField({
			name: 'editCite',
			width: 320,
			placeholder: 'Link',
			cls: 'aloha-cite-href-field',
			scope: 'Aloha.continuoustext',
			noTargetHighlight: false,
			targetHighlightClass: 'aloha-focus'
		});

		plugin.citeNoteField = AttributeField({
			name: 'editNote',
			width: 320,
			placeholder: 'Note',
			cls: 'aloha-cite-note-href-field',
			scope: 'Aloha.continuoustext',
			noTargetHighlight: false,
			targetHighlightClass: 'aloha-focus'
		});

		if (!plugin.referenceContainer) {
			plugin.citeNoteField.setValue('');
			plugin.citeNoteField.hide();
		}

		var onSaveInputs = function () {
			saveCiteDetails(plugin);
		}

		plugin.citeHrefField.getInputJQuery().bind('keyup change', onSaveInputs);
		plugin.citeNoteField.getInputJQuery().bind('keyup change', onSaveInputs);
	}