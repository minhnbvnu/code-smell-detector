function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}