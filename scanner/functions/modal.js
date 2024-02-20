function modal(close) {
			var $modal = $('<div class="repository-browser-modal-window" style="z-index: ' + BASE_ZINDEX + ';"></div>');
			$('body').append($modal);
			return $modal;
		}