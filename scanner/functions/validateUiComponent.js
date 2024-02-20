function validateUiComponent($, id, opts) {
	if (!id) { throw('validateUiComponent exception: No id given'); }

	var comp = $[id];
	it('#' + id + ' is defined', function() {
		expect(comp).toBeDefined();
		expect(comp).not.toBeNull();
	});

	it('#' + id + ' is a Titanium proxy object', function() {
		expect(comp).toBeTiProxy();
	});

	if (opts.api && apiChecks[opts.api]) {
		it('#' + id + ' component is a ' + opts.api, function() {
			apiChecks[opts.api](comp);
		});
	}

	if (opts.style) {
		if ($.__styler && $.__styler[id] && !_.isEmpty($.__styler[id])) {
			opts.style = _.extend(opts.style, $.__styler[id]);
		}
		it('#' + id + ' component has correct style', function() {
			expect(comp).toHaveStyle(opts.style);
		});
	}
}