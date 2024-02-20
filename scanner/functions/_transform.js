function _transform() {
	var codeIn = $('#codeIn').val();
	try {
		var codeOut = Streamline.transform(codeIn, {
			runtime: _generators ? "generators" : "callbacks",
		});
		$('#codeOut').val(codeOut);
		info("ready");
	} catch (ex) {
		console.error(ex);
		error(ex.message);
	}
}