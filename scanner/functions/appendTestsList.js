function appendTestsList( modules ) {
	var i, l, x, z, test, moduleObj;

	for ( i = 0, l = modules.length; i < l; i++ ) {
		moduleObj = modules[ i ];

		if ( moduleObj.name ) {
			modulesList.push( moduleObj.name );
		}

		for ( x = 0, z = moduleObj.tests.length; x < z; x++ ) {
			test = moduleObj.tests[ x ];

			appendTest( test.name, test.testId, moduleObj.name );
		}
	}
}