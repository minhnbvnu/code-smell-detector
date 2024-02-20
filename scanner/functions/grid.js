function grid(browser, $container) {
			var $grid = $('<div class="repository-browser-grid repository-browser-shadow repository-browser-top">'
			          + '<div class="ui-layout-west"></div>'
			          + '<div class="ui-layout-center"></div>'
			          + '</div>');
			$container.append($grid);
			return $grid;
		}