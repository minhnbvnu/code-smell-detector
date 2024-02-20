function fullSuiteDescription(suite) {
		var fullDescription = suite.description;
		if (suite.parentSuite) fullDescription = fullSuiteDescription(suite.parentSuite) + ' ' + fullDescription;
		return fullDescription;
	}