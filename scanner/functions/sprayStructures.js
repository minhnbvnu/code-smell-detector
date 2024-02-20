function sprayStructures() {
		function randomString() {
			return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
		}
		for (var i = 0; i < 0x1000; i++) {
			var a = new Float64Array(1);
			a[randomString()] = 1337;
			structs.push(a);
		}
	}