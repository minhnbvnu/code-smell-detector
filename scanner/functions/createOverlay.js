function createOverlay() {
			var $overlay = $('<div class="repository-browser-modal-overlay" style="z-index: ' + BASE_ZINDEX + ';"></div>');
			$('body').append($overlay);
			$overlay.click(function () {
				$.each(instances, function (i, browser) {
					browser.close();
				});
			});
		}