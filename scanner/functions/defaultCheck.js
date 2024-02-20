function defaultCheck() {
	var allMetas = document.getElementsByTagName('meta');
	for (var i = 0; i< allMetas.length; i++) {
		if (allMetas[i].name == 'defaultView') {
			defaultView = allMetas[i].content;
		}
		if (allMetas[i].name == 'controlVis') {
			controlVis = allMetas[i].content;
		}
	}
}