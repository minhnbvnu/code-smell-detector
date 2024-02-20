function _beautify(str) {
	try {
		/* global escodegen, esprima */
		str = escodegen.generate(esprima.parse(str));
		str = str.replace(/}\s*;/g, "}");
		$('#codeIn').val(str);
		return true;
	} catch (ex) {
		error(ex.message);
		return false;
	}
}