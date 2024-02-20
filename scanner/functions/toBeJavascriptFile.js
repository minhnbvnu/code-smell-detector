function toBeJavascriptFile(expected) {
	var actual = this.actual;
	var notText = this.isNot ? " not" : "";
	this.message = function () {
		return "Expected " + actual + notText + " to be a Javascript file";
	};

	try {
		var js = fs.readFileSync(this.actual,'utf8');
		return toBeJavascript.call({actual:js}, expected);
	} catch (e) {
		return false;
	}
}