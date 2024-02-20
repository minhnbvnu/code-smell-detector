function testOrder() {
			var arr = Array.prototype.slice.call(arguments, 0);
			for (var i = 1; i < arr.length; i++) {
				expect(arr[i - 1].calledBefore(arr[i])).to.be.true;
			}
		}