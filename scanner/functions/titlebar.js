function titlebar(browser, $container) {
			var $title  = $container.find('.ui-jqgrid-titlebar');

			var html = '<div class="repository-browser-btns">'
			         +		'<input type="text" class="repository-browser-search-field" />'
			         +		'<span class="repository-browser-btn repository-browser-search-btn">'
			         +			'<span class="repository-browser-search-icon"></span>'
			         +		'</span>'
			         +		'<span class="repository-browser-btn repository-browser-close-btn">'
			         +			browser._i18n('Close')
			         +		'</span>'
			         +		'<div class="repository-browser-clear"></div>'
			         + '</div>';

			$title.addClass('repository-browser-grab-handle').append(html);

			$title.find('.repository-browser-search-btn').click(function () {
				browser._triggerSearch();
			});

			var $search = $title.find('.repository-browser-search-field').keypress(function (event) {
				// ENTER ←┘
				if (13 === event.keyCode) {
					event.preventDefault();
					browser._triggerSearch();
				}
			});

			$search.val(browser._i18n('Input search text...'))
			       .addClass('repository-browser-search-field-empty');

			$search.focus(function () {
				if ($search.val() === browser._i18n('Input search text...')) {
					$search.val('').removeClass('repository-browser-search-field-empty');
				}
			});

			$search.blur(function () {
				if ('' === $search.val()) {
					$search.val(browser._i18n('Input search text...'))
					       .addClass('repository-browser-search-field-empty');
				}
			});

			$title.find('.repository-browser-close-btn').click(function () {
				browser.close();
			});

			$title.find('.repository-browser-btn')
				.mousedown(function () {
					$(this).addClass('repository-browser-pressed');
				})
				.mouseup(function () {
					$(this).removeClass('repository-browser-pressed');
				});

			return $title;
		}