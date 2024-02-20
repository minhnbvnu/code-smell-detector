function buttonUp(e) {
	// $.removeClass(proxy, classes, opts) removes one or more TSS classes from
	// an existing Titanium API proxy object. Its signature is identical to that
	// of $.addClass, detailed above. Removing a non-existent class will not
	// cause an error, so there's no need to validate the class listing before
	// executing this function.
	$.removeClass($.theButton, 'blueButtonDown');

	// add/remove "redbg bigger" classes from test labels
	var theClass = 'redbg bigger';
	var defaultText = 'add "' + theClass + '" classes';
	if ($.theButton.text === defaultText) {
		$.addClass($.label1, theClass);
		$.addClass($.label2, theClass);
		$.theButton.text = 'remove "' + theClass + '" classes';
	} else {
		$.removeClass($.label1, theClass);
		$.removeClass($.label2, theClass);
		$.theButton.text = defaultText;
	}
}