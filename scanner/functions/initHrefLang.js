function initHrefLang(plugin, sidebar) {
		hrefLangField = AttributeField({
			name: 'hreflangfield',
			valueField: 'id',
			minChars: 1,
			scope: 'Aloha.continuoustext',
			open: function (elm, ui) {
				// known issue http://bugs.jquery.com/ticket/10079
				// $.css('z-index') return 1e+9, and when call partseInt, then 
				// parseInt($.css('z-index'), 10) returns 1.
				// Only firefox issue
				// Everytime is open the autocomple the z-index must be set,
				// because is automatically changed. 
				if (Aloha.browser.mozilla) {
					hrefLangField.getInputJQuery().autocomplete('widget').css('z-index', '9999999999');
				}
			}
		});
		
		if (plugin.flags) {
			hrefLangField.setTemplate(
				 '<div class="aloha-wai-lang-img-item">' +
				  '<img class="aloha-wai-lang-img" src="{url}" />' +
				  '<div class="aloha-wai-lang-label-item">{name} ({id})</div>' +
				  '</div>');
		} else {
			hrefLangField.setTemplate('<div class="aloha-wai-lang-img-item">' +
				  '<div class="aloha-wai-lang-label-item">{name} ({id})</div>' +
				  '</div>'
			);
		}
		
		hrefLangField.setObjectTypeFilter(['language/link']);
		
		hrefLangField.addListener('item-change', function() {
			if (this.getItem()) {
				jQuery(sidebar.effective ).attr( 'hreflang', this.getItem().id);
			}
		});
		
		hrefLangField.addListener('keyup', function() {
			if (jQuery.trim(this.getValue()).length === 0) {
				this.setValue('');
				jQuery(sidebar.effective ).attr( 'hreflang', '');
			}
		});
	}