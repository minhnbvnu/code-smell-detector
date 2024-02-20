function mdct_long(out, outPos, _in) {
			var ct, st;
			{
				var tc1, tc2, tc3, tc4, ts5, ts6, ts7, ts8;
				/* 1,2, 5,6, 9,10, 13,14, 17 */
				tc1 = _in[17] - _in[9];
				tc3 = _in[15] - _in[11];
				tc4 = _in[14] - _in[12];
				ts5 = _in[0] + _in[8];
				ts6 = _in[1] + _in[7];
				ts7 = _in[2] + _in[6];
				ts8 = _in[3] + _in[5];

				out[outPos + 17] = (ts5 + ts7 - ts8) - (ts6 - _in[4]);
				st = (ts5 + ts7 - ts8) * cx[12 + 7] + (ts6 - _in[4]);
				ct = (tc1 - tc3 - tc4) * cx[12 + 6];
				out[outPos + 5] = ct + st;
				out[outPos + 6] = ct - st;

				tc2 = (_in[16] - _in[10]) * cx[12 + 6];
				ts6 = ts6 * cx[12 + 7] + _in[4];
				ct = tc1 * cx[12 + 0] + tc2 + tc3 * cx[12 + 1] + tc4 * cx[12 + 2];
				st = -ts5 * cx[12 + 4] + ts6 - ts7 * cx[12 + 5] + ts8 * cx[12 + 3];
				out[outPos + 1] = ct + st;
				out[outPos + 2] = ct - st;

				ct = tc1 * cx[12 + 1] - tc2 - tc3 * cx[12 + 2] + tc4 * cx[12 + 0];
				st = -ts5 * cx[12 + 5] + ts6 - ts7 * cx[12 + 3] + ts8 * cx[12 + 4];
				out[outPos + 9] = ct + st;
				out[outPos + 10] = ct - st;

				ct = tc1 * cx[12 + 2] - tc2 + tc3 * cx[12 + 0] - tc4 * cx[12 + 1];
				st = ts5 * cx[12 + 3] - ts6 + ts7 * cx[12 + 4] - ts8 * cx[12 + 5];
				out[outPos + 13] = ct + st;
				out[outPos + 14] = ct - st;
			}
			{
				var ts1, ts2, ts3, ts4, tc5, tc6, tc7, tc8;

				ts1 = _in[8] - _in[0];
				ts3 = _in[6] - _in[2];
				ts4 = _in[5] - _in[3];
				tc5 = _in[17] + _in[9];
				tc6 = _in[16] + _in[10];
				tc7 = _in[15] + _in[11];
				tc8 = _in[14] + _in[12];

				out[outPos + 0] = (tc5 + tc7 + tc8) + (tc6 + _in[13]);
				ct = (tc5 + tc7 + tc8) * cx[12 + 7] - (tc6 + _in[13]);
				st = (ts1 - ts3 + ts4) * cx[12 + 6];
				out[outPos + 11] = ct + st;
				out[outPos + 12] = ct - st;

				ts2 = (_in[7] - _in[1]) * cx[12 + 6];
				tc6 = _in[13] - tc6 * cx[12 + 7];
				ct = tc5 * cx[12 + 3] - tc6 + tc7 * cx[12 + 4] + tc8 * cx[12 + 5];
				st = ts1 * cx[12 + 2] + ts2 + ts3 * cx[12 + 0] + ts4 * cx[12 + 1];
				out[outPos + 3] = ct + st;
				out[outPos + 4] = ct - st;

				ct = -tc5 * cx[12 + 5] + tc6 - tc7 * cx[12 + 3] - tc8 * cx[12 + 4];
				st = ts1 * cx[12 + 1] + ts2 - ts3 * cx[12 + 2] - ts4 * cx[12 + 0];
				out[outPos + 7] = ct + st;
				out[outPos + 8] = ct - st;

				ct = -tc5 * cx[12 + 4] + tc6 - tc7 * cx[12 + 5] - tc8 * cx[12 + 3];
				st = ts1 * cx[12 + 0] - ts2 + ts3 * cx[12 + 1] - ts4 * cx[12 + 2];
				out[outPos + 15] = ct + st;
				out[outPos + 16] = ct - st;
			}
		}