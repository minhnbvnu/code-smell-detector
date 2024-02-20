function count_gallery(nextprev, max, is_counting, origel, el, cb) {
			var count = 0;
			if (max === void 0)
				max = settings.mouseover_ui_gallerymax;
			var firstel = el;
			if (!firstel)
				firstel = real_popup_el;
			if (!firstel && popup_el_remote && can_iframe_popout() && !is_in_iframe) {
				return remote_send_message(popup_el_remote, {
					type: "count_gallery",
					data: {
						nextprev: nextprev,
						is_counting: is_counting,
						max: max
					}
				}, function(count) {
					cb(count);
				});
			}
			var loop = function() {
				wrap_gallery_func(nextprev, origel, el, function(newel) {
					if (!newel || !is_valid_el(newel))
						return cb(count, el);
					count++;
					if (count >= max)
						return cb(count, newel);
					el = newel;
					stackoverflow_guard(loop, count, 100);
				}, { is_counting: is_counting, counting_firstel: firstel });
			};
			loop();
		}