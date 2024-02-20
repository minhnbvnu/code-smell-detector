function stop_loading() {
	try {
		$iframe[0].contentWindow.stop();
	} catch (e) {
		$iframe.attr("src", "about:blank");
	}
}