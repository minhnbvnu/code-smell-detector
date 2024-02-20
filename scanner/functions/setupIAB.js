function setupIAB() {

	var iabRef;
	
	document.querySelector('#testIAB').addEventListener('click', function() {
		iabRef = cordova.InAppBrowser.open('http://www.raymondcamden.com','_blank','location=yes');
	});
	
}