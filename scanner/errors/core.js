function core(pyr, id, worker_num) {
			var cascade = this.shared.cascade;
			var interval = this.shared.interval;
			var scale = this.shared.scale;
			var next = this.shared.next;
			var scale_upto = this.shared.scale_upto;
			var i, j, k, x, y, q;
			var scale_x = 1, scale_y = 1;
			var dx = [0, 1, 0, 1];
			var dy = [0, 0, 1, 1];
			var seq = [];
			for (i = 0; i < scale_upto; i++) {
				var qw = pyr[i * 4 + next * 8].width - Math.floor(cascade.width / 4);
				var qh = pyr[i * 4 + next * 8].height - Math.floor(cascade.height / 4);
				var step = [pyr[i * 4].width * 4, pyr[i * 4 + next * 4].width * 4, pyr[i * 4 + next * 8].width * 4];
				var paddings = [pyr[i * 4].width * 16 - qw * 16,
								pyr[i * 4 + next * 4].width * 8 - qw * 8,
								pyr[i * 4 + next * 8].width * 4 - qw * 4];
				for (j = 0; j < cascade.stage_classifier.length; j++) {
					var orig_feature = cascade.stage_classifier[j].orig_feature;
					var feature = cascade.stage_classifier[j].feature = new Array(cascade.stage_classifier[j].count);
					for (k = 0; k < cascade.stage_classifier[j].count; k++) {
						feature[k] = {"size" : orig_feature[k].size,
									  "px" : new Array(orig_feature[k].size),
									  "pz" : new Array(orig_feature[k].size),
									  "nx" : new Array(orig_feature[k].size),
									  "nz" : new Array(orig_feature[k].size)};
						for (q = 0; q < orig_feature[k].size; q++) {
							feature[k].px[q] = orig_feature[k].px[q] * 4 + orig_feature[k].py[q] * step[orig_feature[k].pz[q]];
							feature[k].pz[q] = orig_feature[k].pz[q];
							feature[k].nx[q] = orig_feature[k].nx[q] * 4 + orig_feature[k].ny[q] * step[orig_feature[k].nz[q]];
							feature[k].nz[q] = orig_feature[k].nz[q];
						}
					}
				}
				for (q = 0; q < 4; q++) {
					var u8 = [pyr[i * 4].data, pyr[i * 4 + next * 4].data, pyr[i * 4 + next * 8 + q].data];
					var u8o = [dx[q] * 8 + dy[q] * pyr[i * 4].width * 8, dx[q] * 4 + dy[q] * pyr[i * 4 + next * 4].width * 4, 0];
					for (y = 0; y < qh; y++) {
						for (x = 0; x < qw; x++) {
							var sum = 0;
							var flag = true;
							for (j = 0; j < cascade.stage_classifier.length; j++) {
								sum = 0;
								var alpha = cascade.stage_classifier[j].alpha;
								var feature = cascade.stage_classifier[j].feature;
								for (k = 0; k < cascade.stage_classifier[j].count; k++) {
									var feature_k = feature[k];
									var p, pmin = u8[feature_k.pz[0]][u8o[feature_k.pz[0]] + feature_k.px[0]];
									var n, nmax = u8[feature_k.nz[0]][u8o[feature_k.nz[0]] + feature_k.nx[0]];
									if (pmin <= nmax) {
										sum += alpha[k * 2];
									} else {
										var f, shortcut = true;
										for (f = 0; f < feature_k.size; f++) {
											if (feature_k.pz[f] >= 0) {
												p = u8[feature_k.pz[f]][u8o[feature_k.pz[f]] + feature_k.px[f]];
												if (p < pmin) {
													if (p <= nmax) {
														shortcut = false;
														break;
													}
													pmin = p;
												}
											}
											if (feature_k.nz[f] >= 0) {
												n = u8[feature_k.nz[f]][u8o[feature_k.nz[f]] + feature_k.nx[f]];
												if (n > nmax) {
													if (pmin <= n) {
														shortcut = false;
														break;
													}
													nmax = n;
												}
											}
										}
										sum += (shortcut) ? alpha[k * 2 + 1] : alpha[k * 2];
									}
								}
								if (sum < cascade.stage_classifier[j].threshold) {
									flag = false;
									break;
								}
							}
							if (flag) {
								seq.push({"x" : (x * 4 + dx[q] * 2) * scale_x,
										  "y" : (y * 4 + dy[q] * 2) * scale_y,
										  "width" : cascade.width * scale_x,
										  "height" : cascade.height * scale_y,
										  "neighbor" : 1,
										  "confidence" : sum});
							}
							u8o[0] += 16;
							u8o[1] += 8;
							u8o[2] += 4;
						}
						u8o[0] += paddings[0];
						u8o[1] += paddings[1];
						u8o[2] += paddings[2];
					}
				}
				scale_x *= scale;
				scale_y *= scale;
			}
			return seq;
		}