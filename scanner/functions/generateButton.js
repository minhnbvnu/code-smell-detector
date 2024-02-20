function generateButton(style, plugin, getSwatchClass) {
		return Ui.adopt('colorPicker', Button, {
			tooltip: i18n.t('change-textcolor-' + style),
			icon: 'aloha-icon-textcolor-' + style,
			scope: 'Aloha.continuoustext',
			click: function () {
				if (plugin.overlays[style]) {
					var $button = this.element;

					var swatchClass = getSwatchClass(
						$button.find('.ui-icon').css('background-color')
					);

					plugin.overlays[style].$element.find('.selected')
					              .removeClass('selected');

					plugin.overlays[style].$element.find('.focused')
					              .removeClass('focused');

					plugin.overlays[style].$element.find('.' + swatchClass)
					              .closest('td')
					              .addClass('focused')
					              .addClass('selected');

					var selection = Aloha.getSelection();
					if (selection.getRangeCount()) {
						rangeAtOpen = selection.getRangeAt(0);
					}

					var offset = Overlay.calculateOffset(
						$button,
						Floating.POSITION_STYLE
					);
					offset.top += $button.height();

					plugin.overlays[style].show(offset);

					this.element.blur();
				}
			}
		});
	}