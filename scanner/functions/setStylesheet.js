function setStylesheet(s) {
	var id = "AMMLcustomStyleSheet";
	var n = document.getElementById(id);
	if(document.createStyleSheet) {
		// Test for IE's non-standard createStyleSheet method
		if(n)
			n.parentNode.removeChild(n);
		// This failed without the &nbsp;
		document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeEnd","&nbsp;<style id='" + id + "'>" + s + "</style>");
	} else {
		if(n) {
			n.replaceChild(document.createTextNode(s),n.firstChild);
		} else {
			n = document.createElement("style");
			n.type = "text/css";
			n.id = id;
			n.appendChild(document.createTextNode(s));
			document.getElementsByTagName("head")[0].appendChild(n);
		}
	}
}