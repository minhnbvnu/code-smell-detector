function get_viewport() {
			if (window.visualViewport) {
				return [
					window.visualViewport.width,
					window.visualViewport.height
				];
			} else {
				return [
					window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
					window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
				];
			}
		}