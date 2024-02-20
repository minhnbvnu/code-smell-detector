function fixLinks() {
	var thisUri = window.location.href;
	thisUri = thisUri.slice(0, thisUri.length - window.location.hash.length);
	var aelements = document.getElementsByTagName('A');
	for (var i = 0; i < aelements.length; i++) {
		var a = aelements[i].href;
		var slideID = a.match('\#.+');
		if ((slideID) && (slideID[0].slice(0,1) == '#')) {
			var dest = findSlide(slideID[0].slice(1));
			if (dest != null) {
				if (aelements[i].addEventListener) {
					aelements[i].addEventListener("click", new Function("e",
						"if (document.getElementById('slideProj').disabled) return;" +
						"go("+dest+" - snum); " +
						"if (e.preventDefault) e.preventDefault();"), true);
				} else if (aelements[i].attachEvent) {
					aelements[i].attachEvent("onclick", new Function("",
						"if (document.getElementById('slideProj').disabled) return;" +
						"go("+dest+" - snum); " +
						"event.returnValue = false;"));
				}
			}
		}
	}
}