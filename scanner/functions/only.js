function only( testName, expected, callback, async ) {
	var newTest;

	if ( focused )  { return; }

	QUnit.config.queue.length = 0;
	focused = true;

	if ( arguments.length === 2 ) {
		callback = expected;
		expected = null;
	}

	newTest = new Test( {
		testName: testName,
		expected: expected,
		async: async,
		callback: callback
	} );

	newTest.queue();
}