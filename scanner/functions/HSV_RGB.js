function HSV_RGB (h, s, v) {
			var u = 255 * (v / 100);

			if (h === null) {
				return [ u, u, u ];
			}

			h /= 60;
			s /= 100;

			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = u * (1 - s);
			var n = u * (1 - s * f);
			switch (i) {
				case 6:
				case 0: return [u,n,m];
				case 1: return [n,u,m];
				case 2: return [m,u,n];
				case 3: return [m,n,u];
				case 4: return [n,m,u];
				case 5: return [u,m,n];
			}
		}