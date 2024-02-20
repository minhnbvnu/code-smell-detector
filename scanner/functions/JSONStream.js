function JSONStream(runner, options) {
	    base.call(this, runner, options);
	    var self = this;
	    var total = runner.total;
	    runner.once(EVENT_RUN_BEGIN, function () {
	      writeEvent(['start', {
	        total: total
	      }]);
	    });
	    runner.on(EVENT_TEST_PASS, function (test) {
	      writeEvent(['pass', clean(test)]);
	    });
	    runner.on(EVENT_TEST_FAIL, function (test, err) {
	      test = clean(test);
	      test.err = err.message;
	      test.stack = err.stack || null;
	      writeEvent(['fail', test]);
	    });
	    runner.once(EVENT_RUN_END, function () {
	      writeEvent(['end', self.stats]);
	    });
	  }