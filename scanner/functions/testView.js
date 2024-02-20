function testView(viewName, opts) {
	opts = opts || {};
	var paths, doc;

	if (!opts.widgetId) {
		paths = {
			view: path.join(appPath,CONST.DIR.VIEW,viewName + '.' + CONST.FILE_EXT.VIEW),
			template: path.join(templatePath,'view.xml')
		};
	} else {
		var widgetPath = path.join(appPath,CONST.DIR.WIDGET,opts.widgetId);
		paths = {
			view: path.join(widgetPath,CONST.DIR.VIEW,viewName + '.' + CONST.FILE_EXT.VIEW),
			template: path.join(templatePath,'widget','view.xml')
		};
	}

	it('generates a view named "' + viewName + '"', function() {
		expect(path.existsSync(paths.view)).toBe(true);
	});

	it('file same as the one in alloy distribution', function() {
		expect(paths.view).toHaveSameContentAs(paths.template);
	});

	it('file is valid XML', function() {
		var theFunction = function() {
			var xml = fs.readFileSync(paths.view, 'utf8');
			var errorHandler = {};
			errorHandler.error = errorHandler.fatalError = function(m) {
				throw m;
			};
			doc = new DOMParser({
				errorHandler: errorHandler,
				locator: {}
			}).parseFromString(xml);
		};
		expect(theFunction).not.toThrow();
		expect(doc).not.toBeFalsy();
	});

	it('xml has <Alloy> at root element', function() {
		expect(doc.documentElement.nodeName).toBe('Alloy');
	});
}