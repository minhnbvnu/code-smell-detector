function buttonDown(e) {
	// $.addClass(proxy, classes, opts) adds one or more TSS classes to an
	// existing Titanium API proxy object. Adding a non-existent class will not
	// cause an error.
	//
	//   proxy:   The Titanium API proxy object to which which we will add one
	//            or more classes, as defined in TSS.
	//   classes: An array or space-separated string of classes to be added to
	//            the given proxy object. Note that even if a string is used,
	//            the resulting "classes" property on the proxy object will
	//            still be stored as an array.
	//   opts:    An optional object containing any additional properties you
	//            would like to manually add to the proxy object, after the
	//            given class(es) have been added.
	$.addClass($.theButton, ['blueButtonDown']);
}