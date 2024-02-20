function test2(cb) {
	console.log("\n*** setImmediate n=1 loop=100000 ***");
	pass(1, 100000, 3, setImmediate, function() {
		pass(1, 100000, 10, setImmediate, function() {
			pass(1, 100000, 100, setImmediate, function() {
				pass(1, 100000, 1000, setImmediate, function() {
					cb();
				});
			});
		});
	});
}