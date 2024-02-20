function window_subband(x1, x1Pos, a) {
			var wp = 10;

			var x2 = x1Pos + 238 - 14 - 286;

			for (var i = -15; i < 0; i++) {
				var w, s, t;

				w = enwindow[wp + -10];
				s = x1[x2 + -224] * w;
				t = x1[x1Pos + 224] * w;
				w = enwindow[wp + -9];
				s += x1[x2 + -160] * w;
				t += x1[x1Pos + 160] * w;
				w = enwindow[wp + -8];
				s += x1[x2 + -96] * w;
				t += x1[x1Pos + 96] * w;
				w = enwindow[wp + -7];
				s += x1[x2 + -32] * w;
				t += x1[x1Pos + 32] * w;
				w = enwindow[wp + -6];
				s += x1[x2 + 32] * w;
				t += x1[x1Pos + -32] * w;
				w = enwindow[wp + -5];
				s += x1[x2 + 96] * w;
				t += x1[x1Pos + -96] * w;
				w = enwindow[wp + -4];
				s += x1[x2 + 160] * w;
				t += x1[x1Pos + -160] * w;
				w = enwindow[wp + -3];
				s += x1[x2 + 224] * w;
				t += x1[x1Pos + -224] * w;

				w = enwindow[wp + -2];
				s += x1[x1Pos + -256] * w;
				t -= x1[x2 + 256] * w;
				w = enwindow[wp + -1];
				s += x1[x1Pos + -192] * w;
				t -= x1[x2 + 192] * w;
				w = enwindow[wp + 0];
				s += x1[x1Pos + -128] * w;
				t -= x1[x2 + 128] * w;
				w = enwindow[wp + 1];
				s += x1[x1Pos + -64] * w;
				t -= x1[x2 + 64] * w;
				w = enwindow[wp + 2];
				s += x1[x1Pos + 0] * w;
				t -= x1[x2 + 0] * w;
				w = enwindow[wp + 3];
				s += x1[x1Pos + 64] * w;
				t -= x1[x2 + -64] * w;
				w = enwindow[wp + 4];
				s += x1[x1Pos + 128] * w;
				t -= x1[x2 + -128] * w;
				w = enwindow[wp + 5];
				s += x1[x1Pos + 192] * w;
				t -= x1[x2 + -192] * w;

				/*
				 * this multiplyer could be removed, but it needs more 256 FLOAT
				 * data. thinking about the data cache performance, I think we
				 * should not use such a huge table. tt 2000/Oct/25
				 */
				s *= enwindow[wp + 6];
				w = t - s;
				a[30 + i * 2] = t + s;
				a[31 + i * 2] = enwindow[wp + 7] * w;
				wp += 18;
				x1Pos--;
				x2++;
			}
			{
				var s, t, u, v;
				t = x1[x1Pos + -16] * enwindow[wp + -10];
				s = x1[x1Pos + -32] * enwindow[wp + -2];
				t += (x1[x1Pos + -48] - x1[x1Pos + 16]) * enwindow[wp + -9];
				s += x1[x1Pos + -96] * enwindow[wp + -1];
				t += (x1[x1Pos + -80] + x1[x1Pos + 48]) * enwindow[wp + -8];
				s += x1[x1Pos + -160] * enwindow[wp + 0];
				t += (x1[x1Pos + -112] - x1[x1Pos + 80]) * enwindow[wp + -7];
				s += x1[x1Pos + -224] * enwindow[wp + 1];
				t += (x1[x1Pos + -144] + x1[x1Pos + 112]) * enwindow[wp + -6];
				s -= x1[x1Pos + 32] * enwindow[wp + 2];
				t += (x1[x1Pos + -176] - x1[x1Pos + 144]) * enwindow[wp + -5];
				s -= x1[x1Pos + 96] * enwindow[wp + 3];
				t += (x1[x1Pos + -208] + x1[x1Pos + 176]) * enwindow[wp + -4];
				s -= x1[x1Pos + 160] * enwindow[wp + 4];
				t += (x1[x1Pos + -240] - x1[x1Pos + 208]) * enwindow[wp + -3];
				s -= x1[x1Pos + 224];

				u = s - t;
				v = s + t;

				t = a[14];
				s = a[15] - t;

				a[31] = v + t; /* A0 */
				a[30] = u + s; /* A1 */
				a[15] = u - s; /* A2 */
				a[14] = v - t; /* A3 */
			}
			{
				var xr;
				xr = a[28] - a[0];
				a[0] += a[28];
				a[28] = xr * enwindow[wp + -2 * 18 + 7];
				xr = a[29] - a[1];
				a[1] += a[29];
				a[29] = xr * enwindow[wp + -2 * 18 + 7];

				xr = a[26] - a[2];
				a[2] += a[26];
				a[26] = xr * enwindow[wp + -4 * 18 + 7];
				xr = a[27] - a[3];
				a[3] += a[27];
				a[27] = xr * enwindow[wp + -4 * 18 + 7];

				xr = a[24] - a[4];
				a[4] += a[24];
				a[24] = xr * enwindow[wp + -6 * 18 + 7];
				xr = a[25] - a[5];
				a[5] += a[25];
				a[25] = xr * enwindow[wp + -6 * 18 + 7];

				xr = a[22] - a[6];
				a[6] += a[22];
				a[22] = xr * Util.SQRT2;
				xr = a[23] - a[7];
				a[7] += a[23];
				a[23] = xr * Util.SQRT2 - a[7];
				a[7] -= a[6];
				a[22] -= a[7];
				a[23] -= a[22];

				xr = a[6];
				a[6] = a[31] - xr;
				a[31] = a[31] + xr;
				xr = a[7];
				a[7] = a[30] - xr;
				a[30] = a[30] + xr;
				xr = a[22];
				a[22] = a[15] - xr;
				a[15] = a[15] + xr;
				xr = a[23];
				a[23] = a[14] - xr;
				a[14] = a[14] + xr;

				xr = a[20] - a[8];
				a[8] += a[20];
				a[20] = xr * enwindow[wp + -10 * 18 + 7];
				xr = a[21] - a[9];
				a[9] += a[21];
				a[21] = xr * enwindow[wp + -10 * 18 + 7];

				xr = a[18] - a[10];
				a[10] += a[18];
				a[18] = xr * enwindow[wp + -12 * 18 + 7];
				xr = a[19] - a[11];
				a[11] += a[19];
				a[19] = xr * enwindow[wp + -12 * 18 + 7];

				xr = a[16] - a[12];
				a[12] += a[16];
				a[16] = xr * enwindow[wp + -14 * 18 + 7];
				xr = a[17] - a[13];
				a[13] += a[17];
				a[17] = xr * enwindow[wp + -14 * 18 + 7];

				xr = -a[20] + a[24];
				a[20] += a[24];
				a[24] = xr * enwindow[wp + -12 * 18 + 7];
				xr = -a[21] + a[25];
				a[21] += a[25];
				a[25] = xr * enwindow[wp + -12 * 18 + 7];

				xr = a[4] - a[8];
				a[4] += a[8];
				a[8] = xr * enwindow[wp + -12 * 18 + 7];
				xr = a[5] - a[9];
				a[5] += a[9];
				a[9] = xr * enwindow[wp + -12 * 18 + 7];

				xr = a[0] - a[12];
				a[0] += a[12];
				a[12] = xr * enwindow[wp + -4 * 18 + 7];
				xr = a[1] - a[13];
				a[1] += a[13];
				a[13] = xr * enwindow[wp + -4 * 18 + 7];
				xr = a[16] - a[28];
				a[16] += a[28];
				a[28] = xr * enwindow[wp + -4 * 18 + 7];
				xr = -a[17] + a[29];
				a[17] += a[29];
				a[29] = xr * enwindow[wp + -4 * 18 + 7];

				xr = Util.SQRT2 * (a[2] - a[10]);
				a[2] += a[10];
				a[10] = xr;
				xr = Util.SQRT2 * (a[3] - a[11]);
				a[3] += a[11];
				a[11] = xr;
				xr = Util.SQRT2 * (-a[18] + a[26]);
				a[18] += a[26];
				a[26] = xr - a[18];
				xr = Util.SQRT2 * (-a[19] + a[27]);
				a[19] += a[27];
				a[27] = xr - a[19];

				xr = a[2];
				a[19] -= a[3];
				a[3] -= xr;
				a[2] = a[31] - xr;
				a[31] += xr;
				xr = a[3];
				a[11] -= a[19];
				a[18] -= xr;
				a[3] = a[30] - xr;
				a[30] += xr;
				xr = a[18];
				a[27] -= a[11];
				a[19] -= xr;
				a[18] = a[15] - xr;
				a[15] += xr;

				xr = a[19];
				a[10] -= xr;
				a[19] = a[14] - xr;
				a[14] += xr;
				xr = a[10];
				a[11] -= xr;
				a[10] = a[23] - xr;
				a[23] += xr;
				xr = a[11];
				a[26] -= xr;
				a[11] = a[22] - xr;
				a[22] += xr;
				xr = a[26];
				a[27] -= xr;
				a[26] = a[7] - xr;
				a[7] += xr;

				xr = a[27];
				a[27] = a[6] - xr;
				a[6] += xr;

				xr = Util.SQRT2 * (a[0] - a[4]);
				a[0] += a[4];
				a[4] = xr;
				xr = Util.SQRT2 * (a[1] - a[5]);
				a[1] += a[5];
				a[5] = xr;
				xr = Util.SQRT2 * (a[16] - a[20]);
				a[16] += a[20];
				a[20] = xr;
				xr = Util.SQRT2 * (a[17] - a[21]);
				a[17] += a[21];
				a[21] = xr;

				xr = -Util.SQRT2 * (a[8] - a[12]);
				a[8] += a[12];
				a[12] = xr - a[8];
				xr = -Util.SQRT2 * (a[9] - a[13]);
				a[9] += a[13];
				a[13] = xr - a[9];
				xr = -Util.SQRT2 * (a[25] - a[29]);
				a[25] += a[29];
				a[29] = xr - a[25];
				xr = -Util.SQRT2 * (a[24] + a[28]);
				a[24] -= a[28];
				a[28] = xr - a[24];

				xr = a[24] - a[16];
				a[24] = xr;
				xr = a[20] - xr;
				a[20] = xr;
				xr = a[28] - xr;
				a[28] = xr;

				xr = a[25] - a[17];
				a[25] = xr;
				xr = a[21] - xr;
				a[21] = xr;
				xr = a[29] - xr;
				a[29] = xr;

				xr = a[17] - a[1];
				a[17] = xr;
				xr = a[9] - xr;
				a[9] = xr;
				xr = a[25] - xr;
				a[25] = xr;
				xr = a[5] - xr;
				a[5] = xr;
				xr = a[21] - xr;
				a[21] = xr;
				xr = a[13] - xr;
				a[13] = xr;
				xr = a[29] - xr;
				a[29] = xr;

				xr = a[1] - a[0];
				a[1] = xr;
				xr = a[16] - xr;
				a[16] = xr;
				xr = a[17] - xr;
				a[17] = xr;
				xr = a[8] - xr;
				a[8] = xr;
				xr = a[9] - xr;
				a[9] = xr;
				xr = a[24] - xr;
				a[24] = xr;
				xr = a[25] - xr;
				a[25] = xr;
				xr = a[4] - xr;
				a[4] = xr;
				xr = a[5] - xr;
				a[5] = xr;
				xr = a[20] - xr;
				a[20] = xr;
				xr = a[21] - xr;
				a[21] = xr;
				xr = a[12] - xr;
				a[12] = xr;
				xr = a[13] - xr;
				a[13] = xr;
				xr = a[28] - xr;
				a[28] = xr;
				xr = a[29] - xr;
				a[29] = xr;

				xr = a[0];
				a[0] += a[31];
				a[31] -= xr;
				xr = a[1];
				a[1] += a[30];
				a[30] -= xr;
				xr = a[16];
				a[16] += a[15];
				a[15] -= xr;
				xr = a[17];
				a[17] += a[14];
				a[14] -= xr;
				xr = a[8];
				a[8] += a[23];
				a[23] -= xr;
				xr = a[9];
				a[9] += a[22];
				a[22] -= xr;
				xr = a[24];
				a[24] += a[7];
				a[7] -= xr;
				xr = a[25];
				a[25] += a[6];
				a[6] -= xr;
				xr = a[4];
				a[4] += a[27];
				a[27] -= xr;
				xr = a[5];
				a[5] += a[26];
				a[26] -= xr;
				xr = a[20];
				a[20] += a[11];
				a[11] -= xr;
				xr = a[21];
				a[21] += a[10];
				a[10] -= xr;
				xr = a[12];
				a[12] += a[19];
				a[19] -= xr;
				xr = a[13];
				a[13] += a[18];
				a[18] -= xr;
				xr = a[28];
				a[28] += a[3];
				a[3] -= xr;
				xr = a[29];
				a[29] += a[2];
				a[2] -= xr;
			}
		}