function testResolveContext(name, context, moduleName, result) {
	describe(name, () => {
		it("should resolve async correctly", function (done) {
			asyncContextResolve(context, moduleName, function (err, filename) {
				if (err) done(err);
				expect(filename).toBeDefined();
				expect(filename).toEqual(result);
				done();
			});
		});
		it("should resolve sync correctly", () => {
			const filename = syncContextResolve(context, moduleName);
			expect(filename).toBeDefined();
			expect(filename).toEqual(result);
		});
	});
}