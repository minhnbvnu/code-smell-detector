function bringToFront(browser) {
			$.each(instances, function (index) {
				this.element.css('z-index', BASE_ZINDEX + index);
			});
			browser.element.css('z-index', BASE_ZINDEX + 1 + instances.length);
		}