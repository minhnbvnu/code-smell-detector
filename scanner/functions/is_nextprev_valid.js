function is_nextprev_valid(nextprev, cb) {
			if (popup_el_remote && can_iframe_popout() && !is_in_iframe) {
				return remote_send_message(popup_el_remote, {
					type: "is_nextprev_valid",
					data: {
						nextprev: nextprev
					}
				}, function(valid) {
					cb(valid);
				});
			}
			wrap_gallery_cycle(nextprev ? 1 : -1, void 0, void 0, function(el) {
				cb(is_valid_el(el));
			});
		}