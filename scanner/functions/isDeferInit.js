function isDeferInit() {
		var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++) {
			var attr = scripts[i].getAttribute('data-aloha-defer-init');
			if ("true" === attr) {
				return true;
			}
		}
		return false;
	}