function fht(fz, fzPos, n) {
	        var tri = 0;
	        var k4;
	        var fi;
	        var gi;

	        n <<= 1;
	        /* to get BLKSIZE, because of 3DNow! ASM routine */
	        var fn = fzPos + n;
	        k4 = 4;
	        do {
	            var s1, c1;
	            var i, k1, k2, k3, kx;
	            kx = k4 >> 1;
	            k1 = k4;
	            k2 = k4 << 1;
	            k3 = k2 + k1;
	            k4 = k2 << 1;
	            fi = fzPos;
	            gi = fi + kx;
	            do {
	                var f0, f1, f2, f3;
	                f1 = fz[fi + 0] - fz[fi + k1];
	                f0 = fz[fi + 0] + fz[fi + k1];
	                f3 = fz[fi + k2] - fz[fi + k3];
	                f2 = fz[fi + k2] + fz[fi + k3];
	                fz[fi + k2] = f0 - f2;
	                fz[fi + 0] = f0 + f2;
	                fz[fi + k3] = f1 - f3;
	                fz[fi + k1] = f1 + f3;
	                f1 = fz[gi + 0] - fz[gi + k1];
	                f0 = fz[gi + 0] + fz[gi + k1];
	                f3 = (Util.SQRT2 * fz[gi + k3]);
	                f2 = (Util.SQRT2 * fz[gi + k2]);
	                fz[gi + k2] = f0 - f2;
	                fz[gi + 0] = f0 + f2;
	                fz[gi + k3] = f1 - f3;
	                fz[gi + k1] = f1 + f3;
	                gi += k4;
	                fi += k4;
	            } while (fi < fn);
	            c1 = costab[tri + 0];
	            s1 = costab[tri + 1];
	            for (i = 1; i < kx; i++) {
	                var c2, s2;
	                c2 = 1 - (2 * s1) * s1;
	                s2 = (2 * s1) * c1;
	                fi = fzPos + i;
	                gi = fzPos + k1 - i;
	                do {
	                    var a, b, g0, f0, f1, g1, f2, g2, f3, g3;
	                    b = s2 * fz[fi + k1] - c2 * fz[gi + k1];
	                    a = c2 * fz[fi + k1] + s2 * fz[gi + k1];
	                    f1 = fz[fi + 0] - a;
	                    f0 = fz[fi + 0] + a;
	                    g1 = fz[gi + 0] - b;
	                    g0 = fz[gi + 0] + b;
	                    b = s2 * fz[fi + k3] - c2 * fz[gi + k3];
	                    a = c2 * fz[fi + k3] + s2 * fz[gi + k3];
	                    f3 = fz[fi + k2] - a;
	                    f2 = fz[fi + k2] + a;
	                    g3 = fz[gi + k2] - b;
	                    g2 = fz[gi + k2] + b;
	                    b = s1 * f2 - c1 * g3;
	                    a = c1 * f2 + s1 * g3;
	                    fz[fi + k2] = f0 - a;
	                    fz[fi + 0] = f0 + a;
	                    fz[gi + k3] = g1 - b;
	                    fz[gi + k1] = g1 + b;
	                    b = c1 * g2 - s1 * f3;
	                    a = s1 * g2 + c1 * f3;
	                    fz[gi + k2] = g0 - a;
	                    fz[gi + 0] = g0 + a;
	                    fz[fi + k3] = f1 - b;
	                    fz[fi + k1] = f1 + b;
	                    gi += k4;
	                    fi += k4;
	                } while (fi < fn);
	                c2 = c1;
	                c1 = c2 * costab[tri + 0] - s1 * costab[tri + 1];
	                s1 = c2 * costab[tri + 1] + s1 * costab[tri + 0];
	            }
	            tri += 2;
	        } while (k4 < n);
	    }