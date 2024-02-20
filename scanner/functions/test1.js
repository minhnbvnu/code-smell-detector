function test1(cb) {
	console.log("\n*** setImmediate n=25, loop=1 ***");
	pass(25, 1, 3, setImmediate, function() {
		pass(25, 1, 10, setImmediate, function() {
			pass(25, 1, 100, setImmediate, function() {
				pass(25, 1, 1000, setImmediate, function() {
					cb();
				});
			});
		});
	});
}