function inflate_fast(bl, bd, tl, tl_index, td, td_index, s, z) {
			var t; // temporary pointer
			var tp; // temporary pointer
			var tp_index; // temporary pointer
			var e; // extra bits or operation
			var b; // bit buffer
			var k; // bits in bit buffer
			var p; // input data pointer
			var n; // bytes available there
			var q; // output window write pointer
			var m; // bytes to end of window or read pointer
			var ml; // mask for literal/length tree
			var md; // mask for distance tree
			var c; // bytes to copy
			var d; // distance back to copy from
			var r; // copy source pointer

			var tp_index_t_3; // (tp_index+t)*3

			// load input, output, bit values
			p = z.next_in_index;
			n = z.avail_in;
			b = s.bitb;
			k = s.bitk;
			q = s.write;
			m = q < s.read ? s.read - q - 1 : s.end - q;

			// initialize masks
			ml = inflate_mask[bl];
			md = inflate_mask[bd];

			// do until not enough input or output space for fast loop
			do { // assume called with m >= 258 && n >= 10
				// get literal/length code
				while (k < (20)) { // max bits for literal/length code
					n--;
					b |= (z.read_byte(p++) & 0xff) << k;
					k += 8;
				}

				t = b & ml;
				tp = tl;
				tp_index = tl_index;
				tp_index_t_3 = (tp_index + t) * 3;
				if ((e = tp[tp_index_t_3]) === 0) {
					b >>= (tp[tp_index_t_3 + 1]);
					k -= (tp[tp_index_t_3 + 1]);

					s.window[q++] = /* (byte) */tp[tp_index_t_3 + 2];
					m--;
					continue;
				}
				do {

					b >>= (tp[tp_index_t_3 + 1]);
					k -= (tp[tp_index_t_3 + 1]);

					if ((e & 16) !== 0) {
						e &= 15;
						c = tp[tp_index_t_3 + 2] + (/* (int) */b & inflate_mask[e]);

						b >>= e;
						k -= e;

						// decode distance base of block to copy
						while (k < (15)) { // max bits for distance code
							n--;
							b |= (z.read_byte(p++) & 0xff) << k;
							k += 8;
						}

						t = b & md;
						tp = td;
						tp_index = td_index;
						tp_index_t_3 = (tp_index + t) * 3;
						e = tp[tp_index_t_3];

						do {

							b >>= (tp[tp_index_t_3 + 1]);
							k -= (tp[tp_index_t_3 + 1]);

							if ((e & 16) !== 0) {
								// get extra bits to add to distance base
								e &= 15;
								while (k < (e)) { // get extra bits (up to 13)
									n--;
									b |= (z.read_byte(p++) & 0xff) << k;
									k += 8;
								}

								d = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]);

								b >>= (e);
								k -= (e);

								// do the copy
								m -= c;
								if (q >= d) { // offset before dest
									// just copy
									r = q - d;
									if (q - r > 0 && 2 > (q - r)) {
										s.window[q++] = s.window[r++]; // minimum
										// count is
										// three,
										s.window[q++] = s.window[r++]; // so unroll
										// loop a
										// little
										c -= 2;
									} else {
										s.window.set(s.window.subarray(r, r + 2), q);
										q += 2;
										r += 2;
										c -= 2;
									}
								} else { // else offset after destination
									r = q - d;
									do {
										r += s.end; // force pointer in window
									} while (r < 0); // covers invalid distances
									e = s.end - r;
									if (c > e) { // if source crosses,
										c -= e; // wrapped copy
										if (q - r > 0 && e > (q - r)) {
											do {
												s.window[q++] = s.window[r++];
											} while (--e !== 0);
										} else {
											s.window.set(s.window.subarray(r, r + e), q);
											q += e;
											r += e;
											e = 0;
										}
										r = 0; // copy rest from start of window
									}

								}

								// copy all or what's left
								if (q - r > 0 && c > (q - r)) {
									do {
										s.window[q++] = s.window[r++];
									} while (--c !== 0);
								} else {
									s.window.set(s.window.subarray(r, r + c), q);
									q += c;
									r += c;
									c = 0;
								}
								break;
							} else if ((e & 64) === 0) {
								t += tp[tp_index_t_3 + 2];
								t += (b & inflate_mask[e]);
								tp_index_t_3 = (tp_index + t) * 3;
								e = tp[tp_index_t_3];
							} else {
								z.msg = "invalid distance code";

								c = z.avail_in - n;
								c = (k >> 3) < c ? k >> 3 : c;
								n += c;
								p -= c;
								k -= c << 3;

								s.bitb = b;
								s.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								s.write = q;

								return Z_DATA_ERROR;
							}
						} while (true);
						break;
					}

					if ((e & 64) === 0) {
						t += tp[tp_index_t_3 + 2];
						t += (b & inflate_mask[e]);
						tp_index_t_3 = (tp_index + t) * 3;
						if ((e = tp[tp_index_t_3]) === 0) {

							b >>= (tp[tp_index_t_3 + 1]);
							k -= (tp[tp_index_t_3 + 1]);

							s.window[q++] = /* (byte) */tp[tp_index_t_3 + 2];
							m--;
							break;
						}
					} else if ((e & 32) !== 0) {

						c = z.avail_in - n;
						c = (k >> 3) < c ? k >> 3 : c;
						n += c;
						p -= c;
						k -= c << 3;

						s.bitb = b;
						s.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						s.write = q;

						return Z_STREAM_END;
					} else {
						z.msg = "invalid literal/length code";

						c = z.avail_in - n;
						c = (k >> 3) < c ? k >> 3 : c;
						n += c;
						p -= c;
						k -= c << 3;

						s.bitb = b;
						s.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						s.write = q;

						return Z_DATA_ERROR;
					}
				} while (true);
			} while (m >= 258 && n >= 10);

			// not enough input or output--restore pointers and return
			c = z.avail_in - n;
			c = (k >> 3) < c ? k >> 3 : c;
			n += c;
			p -= c;
			k -= c << 3;

			s.bitb = b;
			s.bitk = k;
			z.avail_in = n;
			z.total_in += p - z.next_in_index;
			z.next_in_index = p;
			s.write = q;

			return Z_OK;
		}