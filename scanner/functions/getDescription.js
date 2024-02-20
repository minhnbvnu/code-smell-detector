function getDescription(suite) {
			if (!suite) { return; }
			desc = suite.description + ' ' + desc;
			getDescription(suite.parentSuite);
		}