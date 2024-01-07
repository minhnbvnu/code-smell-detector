function expectPromiseToFail(fn, done) {
	  fn().then(function () {
	    return done.fail();
	  }, function () {
	    return done();
	  });
	}