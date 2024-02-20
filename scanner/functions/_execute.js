function _execute() {
	var codeIn = $('#codeIn').val();
	try {
		var codeOut = Streamline.transform(codeIn, {
			runtime: _generators ? "generators" : "callbacks",
		});
		eval(codeOut);
	} catch (ex) {
		error(ex.message);
	}
}