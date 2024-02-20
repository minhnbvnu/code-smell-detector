function mdct_short(inout, inoutPos) {
			for (var l = 0; l < 3; l++) {
				var tc0, tc1, tc2, ts0, ts1, ts2;

				ts0 = inout[inoutPos + 2 * 3] * win[Encoder.SHORT_TYPE][0]
						- inout[inoutPos + 5 * 3];
				tc0 = inout[inoutPos + 0 * 3] * win[Encoder.SHORT_TYPE][2]
						- inout[inoutPos + 3 * 3];
				tc1 = ts0 + tc0;
				tc2 = ts0 - tc0;

				ts0 = inout[inoutPos + 5 * 3] * win[Encoder.SHORT_TYPE][0]
						+ inout[inoutPos + 2 * 3];
				tc0 = inout[inoutPos + 3 * 3] * win[Encoder.SHORT_TYPE][2]
						+ inout[inoutPos + 0 * 3];
				ts1 = ts0 + tc0;
				ts2 = -ts0 + tc0;

				tc0 = (inout[inoutPos + 1 * 3] * win[Encoder.SHORT_TYPE][1] - inout[inoutPos + 4 * 3]) * 2.069978111953089e-11;
				/*
				 * tritab_s [ 1 ]
				 */
				ts0 = (inout[inoutPos + 4 * 3] * win[Encoder.SHORT_TYPE][1] + inout[inoutPos + 1 * 3]) * 2.069978111953089e-11;
				/*
				 * tritab_s [ 1 ]
				 */
				inout[inoutPos + 3 * 0] = tc1 * 1.907525191737280e-11 + tc0;
				/*
				 * tritab_s[ 2 ]
				 */
				inout[inoutPos + 3 * 5] = -ts1 * 1.907525191737280e-11 + ts0;
				/*
				 * tritab_s[0 ]
				 */
				tc2 = tc2 * 0.86602540378443870761 * 1.907525191737281e-11;
				/*
				 * tritab_s[ 2]
				 */
				ts1 = ts1 * 0.5 * 1.907525191737281e-11 + ts0;
				inout[inoutPos + 3 * 1] = tc2 - ts1;
				inout[inoutPos + 3 * 2] = tc2 + ts1;

				tc1 = tc1 * 0.5 * 1.907525191737281e-11 - tc0;
				ts2 = ts2 * 0.86602540378443870761 * 1.907525191737281e-11;
				/*
				 * tritab_s[ 0]
				 */
				inout[inoutPos + 3 * 3] = tc1 + ts2;
				inout[inoutPos + 3 * 4] = tc1 - ts2;

				inoutPos++;
			}
		}