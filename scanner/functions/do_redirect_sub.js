function do_redirect_sub(page_url, force_page, redirect) {
		var bigimage_obj = {
			fill_object: true,
			force_page: force_page,
			cb: function(newhref) {
				if (_nir_debug_) {
					console_log("do_redirect (final)", newhref);
				}
				cursor_default();
				if (!newhref) {
					return;
				}
				if (is_interactive && settings.print_imu_obj)
					console_log(newhref);
				var newurl = newhref[0].url;
				if (false && newhref[0].extra && newhref[0].extra.page) {
					console_log("Original page: " + newhref[0].extra.page);
				}
				if (newurl === page_url)
					return;
				if (!newurl)
					return;
				if (_nir_debug_)
					console_log("redirect (recursive loop)", newhref);
				redirect(newurl, newhref);
			}
		};
		if (is_interactive) {
			bigimage_obj.document = document;
			bigimage_obj.window = get_window();
		}
		bigimage_recursive_loop(page_url, bigimage_obj, function(newhref, real_finalcb) {
			if (_nir_debug_) {
				console_log("do_redirect", newhref);
			}
			var currentobj = null;
			var finalcb = function(newurl, data, newobj) {
				real_finalcb(newurl, newobj || currentobj, data);
			};
			if (false && (!newhref[0].can_head || newhref[0].always_ok)) {
				var newurl = newhref[0].url;
				if (newurl === window.location.href) {
					cursor_default();
					return;
				}
				if (_nir_debug_) {
					console_log("Not checking due to can_head == false || always_ok == true");
				}
				finalcb(newurl);
				return;
			}
			var new_newhref = [];
			for (var i = 0; i < newhref.length; i++) {
				// is_probably_video and is_probably_audio have some overlap, so check them both
				if (!settings.redirect_video && is_probably_video(newhref[i]) &&
					!(settings.redirect_audio && is_probably_audio(newhref[i]))) {
					continue;
				}
				if (!settings.redirect_audio && is_probably_audio(newhref[i]) &&
					!(settings.redirect_video && is_probably_video(newhref[i]))) {
					continue;
				}
				new_newhref.push(newhref[i]);
			}
			var no_infobox = settings.redirect_to_no_infobox;
			var infobox_urls = [];
			var use_infobox = false;
			// TODO: avoid requesting again for second round after no_infobox (e.g. for force_download errors)
			var index = 0;
			var cb = function(err_txt, is_infobox) {
				if (_nir_debug_) {
					console_log("do_redirect_sub's err_cb:", err_txt, is_infobox);
				}
				if (is_infobox)
					infobox_urls.push(new_newhref[index]);
				index++;
				var array = new_newhref;
				if (use_infobox)
					array = infobox_urls;
				if (index >= array.length) {
					if (no_infobox && infobox_urls.length > 0) {
						use_infobox = true;
						no_infobox = false;
						index = 0;
					} else {
						cursor_default();
						console_error(err_txt);
						return;
					}
				}
				// FIXME: deduplicate
				if (same_url(window.location.href, array[index]) && no_infobox && infobox_urls.length > 0) {
					use_infobox = true;
					no_infobox = false;
					index = 0;
				}
				currentobj = array[index];
				check_image(currentobj, page_url, cb, finalcb, no_infobox);
			};
			currentobj = new_newhref[0];
			check_image(currentobj, page_url, cb, finalcb, no_infobox);
		});
	}