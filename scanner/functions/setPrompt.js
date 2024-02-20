function setPrompt() {
	var jsPart = isJavascript ? "/js" : "";
	if(connection) {
		r.setPrompt(("switch '" + consoleName(connection.serial) + "' (" + connection.fwVersion + ")" + jsPart).cyan + "> ");
	} else {
		r.setPrompt(("switch" + jsPart).cyan + "> ");
	}
}