function createStatsCollector(runner) {
	  /**
	   * @type StatsCollector
	   */
	  var stats = {
	    suites: 0,
	    tests: 0,
	    passes: 0,
	    pending: 0,
	    failures: 0
	  };

	  if (!runner) {
	    throw new TypeError('Missing runner argument');
	  }

	  runner.stats = stats;
	  runner.once(EVENT_RUN_BEGIN, function () {
	    stats.start = new Date$2();
	  });
	  runner.on(EVENT_SUITE_BEGIN, function (suite) {
	    suite.root || stats.suites++;
	  });
	  runner.on(EVENT_TEST_PASS, function () {
	    stats.passes++;
	  });
	  runner.on(EVENT_TEST_FAIL, function () {
	    stats.failures++;
	  });
	  runner.on(EVENT_TEST_PENDING, function () {
	    stats.pending++;
	  });
	  runner.on(EVENT_TEST_END, function () {
	    stats.tests++;
	  });
	  runner.once(EVENT_RUN_END, function () {
	    stats.end = new Date$2();
	    stats.duration = stats.end - stats.start;
	  });
	}