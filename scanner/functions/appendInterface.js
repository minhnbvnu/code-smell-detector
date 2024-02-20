function appendInterface() {
	var qunit = id( "qunit" );

	if ( qunit ) {
		qunit.innerHTML =
			"<h1 id='qunit-header'>" + escapeText( document.title ) + "</h1>" +
			"<h2 id='qunit-banner'></h2>" +
			"<div id='qunit-testrunner-toolbar'></div>" +
			appendFilteredTest() +
			"<h2 id='qunit-userAgent'></h2>" +
			"<ol id='qunit-tests'></ol>";
	}

	appendHeader();
	appendBanner();
	appendTestResults();
	appendUserAgent();
	appendToolbar();
}