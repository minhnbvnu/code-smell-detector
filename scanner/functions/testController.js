function testController(viewName, opts) {
	opts = opts || {};
	var paths;

	if (!opts.widgetId) {
		paths = {
			controller: path.join(appPath,CONST.DIR.CONTROLLER,viewName + '.' + CONST.FILE_EXT.CONTROLLER),
			template: path.join(templatePath,'controller.js')
		};
	} else {
		var widgetPath = path.join(appPath,CONST.DIR.WIDGET,opts.widgetId);
		paths = {
			controller: path.join(widgetPath,CONST.DIR.CONTROLLER,viewName + '.' + CONST.FILE_EXT.CONTROLLER),
			template: path.join(templatePath,'widget','controller.js')
		};
	}

	it('controller named "' + viewName + '"', function() {
		expect(path.existsSync(paths.controller)).toBe(true);
	});

	it('matches the one in the alloy distribution', function() {
		expect(paths.controller).toHaveSameContentAs(paths.template);
	});
}