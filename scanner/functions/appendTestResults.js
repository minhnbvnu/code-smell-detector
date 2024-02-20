function appendTestResults() {
	var tests = id( "qunit-tests" ),
		result = id( "qunit-testresult" );

	if ( result ) {
		result.parentNode.removeChild( result );
	}

	if ( tests ) {
		tests.innerHTML = "";
		result = document.createElement( "p" );
		result.id = "qunit-testresult";
		result.className = "result";
		tests.parentNode.insertBefore( result, tests );
		result.innerHTML = "Running...<br />&#160;";
	}
}