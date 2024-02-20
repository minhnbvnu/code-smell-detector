function getWindowWidth() {
		if (window.innerWidth) {
			return window.innerWidth;
		} else if (document.documentElement.clientWidth) {
			return document.documentElement.clientWidth;
		} else if (document.body.clientWidth) {
			return document.body.clientWidth;
		} else{
			return 0;	
		}
	}