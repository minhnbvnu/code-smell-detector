function assertExitCode(t, expectedCode, assertMsg) {
		cp.on("close", function(code) {
			t.equal(code, expectedCode, assertMsg);
		});
	}