function loadRun (obj) {
	window.exploitMe = obj;
	var elem = document.createElement('script');
	elem.setAttribute('src', 'bundle.js');
	document.body.appendChild(elem);
}