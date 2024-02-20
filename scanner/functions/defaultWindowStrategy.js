function defaultWindowStrategy(url) {
	var w = window.open(url, '_blank', 'width=500,height=400');
	return function () {
		w.close();
	};
}