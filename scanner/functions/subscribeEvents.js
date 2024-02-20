function subscribeEvents(plugin) {
		PubSub.sub('aloha.editable.created', function (message) {
			var $editable = message.editable.obj;
			var config = plugin.getEditableConfig($editable);
			var enabled = config
			           && ($.inArray('span', config) > -1)
			           && ContentRules.isAllowed($editable[0], 'span');

			configurations[message.editable.getId()] = enabled;

			if (!enabled) {
				return;
			}

			$editable.bind('keydown', plugin.hotKey.insertAnnotation, function () {
					prepareAnnotation();

					// Because on a MAC Safari, cursor would otherwise
					// automatically jump to location bar.  We therefore prevent
					// bubbling, so that the editor must hit ESC and then META+I
					// to manually do that
					return false;
				}
			);

			$editable.find('span[lang]').each(function () {
				annotate(this);
			});
		});

		PubSub.sub('aloha.editable.activated', function (message) {
			plugin._wailangButton.show(!!configurations[message.editable.getId()]);
		});

		PubSub.sub('aloha.editable.deleted', function (message) {
			delete configurations[message.editable.getId()];
		});

		Aloha.bind(
			'aloha-selection-changed',
			function onSelectionChanged($event, range) {
				var markup = findWaiLangMarkup(range);
				if (markup) {
					plugin._wailangButton.setState(true);
					//IE9 Fix, "lang" value not in dom attributes,
					//use "xml:lang" instead
					FIELD.setTargetObject(markup, isIE9 ? 'xml:lang' : 'lang');

					FIELD.show();
					removeButton.show();
					Scopes.enterScope(plugin.name, 'wai-lang');
				} else {
					plugin._wailangButton.setState(false);
					FIELD.setTargetObject(null);
					FIELD.hide();
					removeButton.hide();
					Scopes.leaveScope(plugin.name, 'wai-lang', true);
				}
			}
		);

		FIELD.addListener('blur', function onFieldBlur() {
			// @TODO Validate value to not permit values outside the set of
			//       configured language codes
			if (!this.getValue()) {
				removeMarkup(Selection.getRangeObject());
			}
		});
	}