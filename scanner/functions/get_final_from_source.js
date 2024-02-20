function get_final_from_source(source, options, cb) {
			// FIXME: "multi" is used purely for replace_images,
			//   so it's used as a check for many options that have nothing to do with multi
			var processing = { running: true };
			if (!options.multi) {
				stop_processing();
				processing_list = [processing];
			}
			//console_log(source);
			var do_popup = function() {
				if (!options.multi)
					start_waiting(source.el);
				var x = mouseX;
				var y = mouseY;
				var realcb = function(source_imu, data) {
					//console_log(source_imu);
					//console_log(data);
					// why && false here? this should be clarified
					if ((!source_imu && false) || !data) {
						if (!options.multi) {
							stop_waiting_cant_load();
						}
						return cb();
					}
					// In case the user has dragged while loading the next image (#154)
					if (options.use_last_pos) {
						x = null;
						y = null;
					}
					cb(source_imu, source, processing, {
						data: data,
						x: x,
						y: y
					});
				};
				try {
					// FIXME: shouldn't this be ||?
					var force_page = settings.mouseover_ui_caption && settings.redirect_force_page;
					bigimage_recursive_loop(source.src, {
						fill_object: true,
						host_url: window.location.href,
						document: document,
						window: get_window(),
						element: source.el,
						force_page: force_page,
						cb: realcb
					}, function(obj, finalcb) {
						var orig_obj = obj;
						if (_nir_debug_)
							console_log("do_popup: brl query:", obj);
						if (options.null_if_no_change && obj[0].url === source.src) {
							return finalcb(source.src, obj[0], null);
						}
						var newobj = deepcopy(obj);
						// TODO: find a way to fix bad images popping up because they weren't caught in addImage (because of do_request: null)
						// brl returns [] if they're bad, but the bad sources are added right back here
						if (!settings.mouseover_exclude_sameimage) {
							if (source.src && obj_indexOf(newobj, source.src) < 0)
								newobj.push(fillobj(source.src)[0]);
						} else if (source.src) {
							var index;
							while ((index = obj_indexOf(newobj, source.src)) >= 0) {
								newobj.splice(index, 1);
							}
						}
						if (source.pagelink) {
							newobj = basic_fillobj(newobj);
							array_foreach(newobj, function(sobj) {
								if (sobj.url.replace(/#.*/, "") === source.src.replace(/#.*/, "")) {
									sobj.is_pagelink = true;
								}
							});
						}
						processing.incomplete_image = options.incomplete_image;
						processing.incomplete_video = options.incomplete_video;
						processing.progress_cb = options.progress_cb;
						if (options.use_head) {
							processing.head = true;
						}
						if (settings.popup_allow_cache && !options.deny_cache) {
							processing.set_cache = true;
							processing.use_cache = true;
						}
						processing.deny_nondirect_delivery = options.deny_nondirect_delivery;
						if (!get_tprofile_setting("mouseover_allow_video")) {
							processing.deny_video = true;
						}
						if (!get_tprofile_setting("mouseover_allow_audio")) {
							processing.deny_audio = true;
						}
						processing.source = source;
						check_image_get(newobj, function(img, newurl, obj, respdata) {
							if (_nir_debug_)
								console_log("do_popup: check_image_get response:", img, newurl, obj, respdata);
							if (!img) {
								return finalcb(null);
							}
							var data = { img: img, newurl: newurl, obj: obj, respdata: respdata };
							var newurl1 = newurl;
							if (options.use_head) {
								data = { resp: img, obj: newurl };
								newurl1 = data.resp.finalUrl;
							}
							if (settings.print_imu_obj)
								console_log(orig_obj);
							finalcb(newurl1, data.obj, data);
							if (false) {
								// why?
								if (newurl == source.src) {
									realcb(obj, data);
								} else {
									finalcb(newurl, data);
								}
							}
						}, processing);
					});
				} catch (e) {
					console_error(e);
					//console.trace();
					// this doesn't work
					//makePopup(source.src);
				}
			};
			if (delay && !delay_mouseonly && !options.automatic) {
				start_progress(source.el);
				delay_handle = setTimeout(function() {
					if (delay_handle_triggering)
						return;
					delay_handle = null;
					do_popup();
				}, delay * 1000);
			} else {
				do_popup();
			}
		}