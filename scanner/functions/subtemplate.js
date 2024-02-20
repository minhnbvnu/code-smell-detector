function subtemplate(template, data) {
	try {
		return new JSDOC.JsPlate(publish.conf.templatesDir+template).process(data);
	}
	catch(e) { print(e.message); quit(); }
}