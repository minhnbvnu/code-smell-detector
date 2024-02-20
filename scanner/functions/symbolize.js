function symbolize(opt) {
	symbols = null;
	JSDOC.JsDoc(opt);
	symbols = JSDOC.JsDoc.symbolSet;
}