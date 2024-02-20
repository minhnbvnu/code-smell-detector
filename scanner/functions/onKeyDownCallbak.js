function onKeyDownCallbak(event) {
		if (event.keyCode == 27) {
			csInterface.closeExtension();
		} else if (event.keyCode == 13) {
			requestApplyDissolve();
		}
	}