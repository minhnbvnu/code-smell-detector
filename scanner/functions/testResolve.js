function testResolve(name, context, moduleName, result) {
	describe(name, () => {
		it("should resolve sync correctly", () => {
			const filename = resolve.sync(context, moduleName);
			expect(filename).toBeDefined();
			expect(filename).toEqual(result);
		});
		it("should resolve async correctly", function (done) {
			resolve(context, moduleName, function (err, filename) {
				if (err) return done(err);
				expect(filename).toBeDefined();
				expect(filename).toEqual(result);
				done();
			});
		});
	});
}