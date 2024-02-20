function getSpies(item, arr) {
			var res = {};
			arr.forEach(function(a) {
				res[a] = sinon.spy(item, a);
			});
			return res;
		}