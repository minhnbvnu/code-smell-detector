function test3(cb) {
	console.log("\n*** readMe n=1 loop=10000 ***");
	pass(1, 10000, 3, readMe, function() {
		pass(1, 10000, 10, readMe, function() {
			pass(1, 10000, 100, readMe, function() {
				cb();
			});
		});
	});
}