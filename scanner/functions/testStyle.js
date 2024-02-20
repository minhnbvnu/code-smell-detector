function testStyle(viewName, opts) {
	opts = opts || {};
	var paths;

	if (!opts.widgetId) {
		paths = {
			style: path.join(appPath,CONST.DIR.STYLE,viewName + '.' + CONST.FILE_EXT.STYLE),
			template: path.join(templatePath,'style.tss')
		};
	} else {
		var widgetPath = path.join(appPath,CONST.DIR.WIDGET,opts.widgetId);
		paths = {
			style: path.join(widgetPath,CONST.DIR.STYLE,viewName + '.' + CONST.FILE_EXT.STYLE),
			template: path.join(templatePath,'widget','style.tss')
		};
	}

	it('generate a style named "' + viewName + '"', function() {
		expect(path.existsSync(paths.style)).toBe(true);
	});

	// it('generated style matches the one in the alloy distribution', function() {
	// 	expect(paths.style).toHaveSameContentAs(paths.template);
	// });

	it('style is valid TSS', function() {
		expect(paths.style).toBeTssFile();
	});
}