function appendFilteredTest() {
	var testId = QUnit.config.testId;
	if ( !testId || testId.length <= 0 ) {
		return "";
	}
	return "<div id='qunit-filteredTest'>Rerunning selected tests: " +
		escapeText( testId.join( ", " ) ) +
		" <a id='qunit-clearFilter' href='" +
		escapeText( unfilteredUrl ) +
		"'>Run all tests</a></div>";
}