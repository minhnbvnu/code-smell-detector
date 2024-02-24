function trigger_popup_with_source(source, automatic, use_last_pos, cb) {
			next_popup_el = get_physical_popup_el(source.el);
			if (!cb)
				cb = common_functions["nullfunc"];
			var use_head = false;
			var openb = get_tprofile_single_setting("mouseover_open_behavior");
			if (openb === "newtab" || openb === "newtab_bg" || openb === "download" || openb === "copylink") {
				use_head = true;
			}
			var old_source = source;
			var incomplete_image = false;
			var incomplete_video = false;
			var partial = get_single_setting("mouseover_allow_partial");
			if (partial === "media") {
				incomplete_image = true;
				incomplete_video = true;
			} else if (partial === "video") {
				incomplete_video = true;
			}
			if (is_in_iframe && can_iframe_popout()) {
				incomplete_image = true;
				incomplete_video = true;
			}
			return get_final_from_source(source, {
				automatic: automatic,
				multi: false,
				use_head: use_head,
				incomplete_image: incomplete_image,
				incomplete_video: incomplete_video,
				use_last_pos: use_last_pos
			}, function(source_imu, source, processing, data) {
				if (!source_imu && !source && !processing && !data) {
					delay_handle_triggering = false;
					if (old_source.pagelink) {
						stop_waiting_cant_load();
					} else {
						stop_waiting();
					}
					return cb(false);
				}
				// FIXME: this shouldn't fail, but rather go to the next element
				if (automatic && previous_album_links && source_imu && source_imu[0]) {
					if (array_indexof(previous_album_links, source_imu[0].url) >= 0) {
						delay_handle_triggering = false;
						stop_waiting();
						return cb(false);
					}
				}
				var was_fullscreen = is_popup_fullscreen();
				//console_log(source_imu);
				resetpopups({
					new_popup: true,
					automatic: automatic
				});
				if (automatic) {
					popup_el_automatic = true;
					removepopups(); // don't fade out
				}
				real_popup_el = source.el;
				popup_el = get_physical_popup_el(real_popup_el);
				if (popup_el.parentElement) // check if it's a fake element returned by a gallery helper
					popup_orig_el = popup_el;
				popup_el_mediatype = el_media_type(popup_el);
				popup_el_is_stream = popup_el_mediatype === "video" || popup_el_mediatype === "audio";
				popup_orig_url = get_img_src(popup_el);
				if (is_in_iframe && can_iframe_popout() && get_tprofile_single_setting("mouseover_open_behavior") === "popup") {
					data.data.img = serialize_img(data.data.img);
					remote_send_message("top", {
						type: "make_popup",
						data: {
							source_imu: source_imu,
							src: source.src,
							processing: processing,
							data: data
						}
					});
				} else {
					makePopup(source_imu, source.src, processing, data);
					if (is_in_iframe && can_use_remote() && get_tprofile_single_setting("mouseover_open_behavior") === "popup") {
						remote_send_message("top", {
							type: "popup_open"
						});
					}
					// fixme: this actually doesn't work, because it's not counted as being part of a user event
					if (false && was_fullscreen) {
						popup_set_fullscreen();
					}
				}
				cb(true);
			});
		}