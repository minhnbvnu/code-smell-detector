function assertNotStderrData(t) {
		stderr.on("data", data => {
			console.error(data.toString());
			t.fail("should not have stderr output");
		});
	}