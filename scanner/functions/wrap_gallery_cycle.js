function wrap_gallery_cycle(dir, origel, el, cb) {
			if (!el)
				el = real_popup_el;
			if (dir === 0)
				return cb();
			var nextprev = true;
			var max = dir;
			if (dir < 0) {
				nextprev = false;
				max = -dir;
			}
			count_gallery(nextprev, max, false, origel, el, function(count, newel) {
				if (count < max) {
					if (settings.mouseover_gallery_cycle) {
						count_gallery(!nextprev, void 0, true, origel, el, function(count, newel) {
							cb(newel);
						});
					} else {
						cb(null);
					}
				} else {
					cb(newel);
				}
			});
		}