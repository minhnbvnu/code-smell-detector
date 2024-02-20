function do_mouseover() {
		if (_nir_debug_)
			console_log("do_mouseover ran");
		var mouseover_base_enabled = function() {
			if (!settings.imu_enabled)
				return false;
			if (!host_filter(window.location.href))
				return false;
			return true;
		};
		var mouseover_enabled = function() {
			return mouseover_base_enabled() && settings.mouseover;
		};
		var mouseover_mouse_enabled = function() {
			return mouseover_enabled() && delay !== false && typeof delay === "number" && delay_mouseonly;
		};
		var mousepos_initialized = false;
		var mouseX = 0;
		var mouseY = 0;
		var mouseAbsX = 0;
		var mouseAbsY = 0;
		var mouse_frame_id = "top";
		var mouseContextX = null;
		var mouseContextY = null;
		var mouseAbsContextX = 0;
		var mouseAbsContextY = 0;
		var mouse_in_image_yet = false;
		var mouseDelayX = 0;
		var mouseDelayY = 0;
		var lastX = 0;
		var lastY = 0;
		var processing_list = [];
		var popups = [];
		var trigger_id = null;
		var mask_el = null;
		var popup_obj = null;
		var previous_album_links = null;
		var override_album = null;
		var popup_contentlength = null;
		var popup_el = null;
		var popup_el_mediatype = null;
		var popup_el_is_stream = false;
		var popup_orig_url = null;
		var resetpopup_timeout = null;
		var real_popup_el = null;
		var next_popup_el = null;
		var last_popup_el = null;
		var popup_orig_el = null;
		var popup_el_automatic = false;
		var popup_el_remote = false;
		var popups_active = false;
		var popup_trigger_reason = null;
		var can_close_popup = [false, false];
		var popup_hold = false;
		var popup_hold_func = common_functions["nullfunc"];
		var popup_zoom_func = common_functions["nullfunc"];
		var popup_createui_func = common_functions["nullfunc"];
		var popup_wheel_cb = null;
		var popup_update_pos_func = null;
		var popup_update_zoom_func = null;
		var popup_hidecursor_func = common_functions["nullfunc"];
		var popup_hidecursor_timer = null;
		var popup_cursorjitterX = 0;
		var popup_cursorjitterY = 0;
		var popup_is_fullscreen = false;
		var popup_last_zoom = null;
		var popup_client_rect_cache = null;
		var last_popup_client_rect_cache = 0;
		var popup_media_client_rect_cache = null;
		var last_popup_media_client_rect_cache = 0;
		var dragstart = false;
		var dragstartX = null;
		var dragstartY = null;
		var dragoffsetX = null;
		var dragoffsetY = null;
		var popupOpenX = null;
		var popupOpenY = null;
		var popupOpenLastX = null;
		var popupOpenLastY = null;
		var dragged = false;
		var waiting = false;
		var waitingel = null;
		var waitingstyleel = null;
		var waitingel_cursor = null;
		var elwaitingstyleclass = null;
		var elwaitingstyleel = null;
		var waitingsize = 200;
		var current_chord = [];
		var current_chord_timeout = {};
		var release_ignore = [];
		var editing_text = false;
		var host_location = window_location;
		var host_domain = get_domain_from_url(host_location);
		var host_domain_nosub = get_domain_nosub(host_domain);
		function resetifout(e) {
			// doesn't work, as e doesn't contain ctrlKey etc.
			if (!trigger_complete(settings.mouseover_trigger_key)) {
				//current_chord = [];
				stop_waiting();
				resetpopups();
			}
		}
		// runs on every focusout, not just window
		/*document.addEventListener("focusout", resetifout);
		  document.addEventListener("blur", resetifout);
		  unsafeWindow.addEventListener("focusout", resetifout);
		  unsafeWindow.addEventListener("blur", resetifout);*/
		if (false) {
			var disable_click = false;
			document.addEventListener("click", function(e) {
				if (disable_click && popups_active && false) {
					e.stopPropagation();
					e.stopImmediatePropagation();
					return true;
					//return false;
				}
			}, true);
		}
		var delay = false;
		var delay_handle = null;
		var delay_handle_triggering = false;
		var delay_mouseonly = true;
		var delay_el = null;
		function get_tprofile_setting_name(setting_name) {
			if (trigger_id) {
				var new_settingname = "t" + trigger_id + "_" + setting_name;
				if (new_settingname in settings)
					setting_name = new_settingname;
			}
			return setting_name;
		}
		function get_tprofile_setting(setting_name) {
			return settings[get_tprofile_setting_name(setting_name)];
		}
		function get_tprofile_single_setting(setting) {
			return get_single_setting_raw(get_tprofile_setting(setting));
		}
		function update_waiting() {
			if (!waitingel)
				return;
			var x = mouseX; //mouseAbsX;
			var y = mouseY; //mouseAbsY;
			waitingel.style.left = (x - (waitingsize / 2)) + "px";
			waitingel.style.top = (y - (waitingsize / 2)) + "px";
		}
		var start_waiting = function(el, cursor) {
			if (!cursor)
				cursor = "wait";
			waitingel_cursor = cursor;
			waiting = true;
			if (!settings.mouseover_wait_use_el) {
				if (waitingstyleel) {
					stop_waiting();
				}
				waitingstyleel = document_createElement("style");
				waitingstyleel.innerText = "*,a,img,video {cursor: " + cursor + "!important}";
				document.documentElement.appendChild(waitingstyleel);
				return;
			}
			if (!waitingel) {
				waitingel = document_createElement("div");
				set_el_all_initial(waitingel);
				waitingel.style.zIndex = maxzindex;
				waitingel.style.cursor = cursor;
				waitingel.style.width = waitingsize + "px";
				waitingel.style.height = waitingsize + "px";
				//waitingel.style.pointerEvents = "none"; // works, but defeats the purpose, because the cursor isn't changed
				waitingel.style.position = "fixed"; //"absolute";
				var simevent = function(e, eventtype) {
					waitingel.style.display = "none";
					document.elementFromPoint(e.clientX, e.clientY).dispatchEvent(new MouseEvent(eventtype, e));
					waitingel.style.display = "block";
				};
				our_addEventListener(waitingel, "click", function(e) {
					return simevent(e, "click");
				});
				our_addEventListener(waitingel, "contextmenu", function(e) {
					return simevent(e, "contextmenu");
				});
				document.documentElement.appendChild(waitingel);
			}
			waitingel.style.cursor = cursor;
			waitingel.style.display = "block";
			update_waiting();
		};
		function start_progress(el) {
			start_waiting(el, "progress");
		}
		var stop_waiting = function() {
			if (_nir_debug_) {
				console_log("stop_waiting");
			}
			waiting = false;
			if (!settings.mouseover_wait_use_el) {
				if (waitingstyleel) {
					waitingstyleel.parentElement.removeChild(waitingstyleel);
					waitingstyleel = null;
				}
			}
			if (waitingel)
				waitingel.style.display = "none";
		};
		// camhub.cc (ublock origin blocks any setTimeout'd function with 'stop' in the name)
		function dont_wait_anymore() {
			stop_waiting();
		}
		var not_allowed_timer = null;
		function cursor_not_allowed() {
			if (_nir_debug_) {
				console_log("cursor_not_allowed");
			}
			start_waiting(void 0, "not-allowed");
			if (not_allowed_timer) {
				clearTimeout(not_allowed_timer);
			}
			not_allowed_timer = setTimeout(function() {
				not_allowed_timer = null;
				if (waitingel_cursor === "not-allowed")
					dont_wait_anymore();
			}, settings.mouseover_notallowed_duration);
		}
		function stop_waiting_cant_load() {
			if (settings.mouseover_enable_notallowed_cant_load) {
				cursor_not_allowed();
			} else {
				stop_waiting();
			}
		}
		function in_clientrect(mouseX, mouseY, rect, border) {
			if (isNaN(border) || border === void 0)
				border = 0;
			if (mouseX >= (rect.left - border) && mouseX <= (rect.right + border) &&
				mouseY >= (rect.top - border) && mouseY <= (rect.bottom + border)) {
				return true;
			} else {
				return false;
			}
		}
		function stop_processing() {
			for (var i = 0; i < processing_list.length; i++) {
				processing_list[i].running = false;
			}
		}
		var clear_resetpopup_timeout = function() {
			if (resetpopup_timeout) {
				clearTimeout(resetpopup_timeout);
				resetpopup_timeout = null;
			}
		};
		var add_resetpopup_timeout = function() {
			if (!settings.mouseover_auto_close_popup || !settings.mouseover_auto_close_popup_time)
				return;
			clear_resetpopup_timeout();
			resetpopup_timeout = setTimeout(resetpopups, settings.mouseover_auto_close_popup_time * 1000);
		};
		var removepopups_timer = null;
		function removepopups() {
			array_foreach(popups, function(popup) {
				var els = popup.querySelectorAll("img, video, audio");
				for (var i = 0; i < els.length; i++) {
					if (els[i].tagName === "VIDEO" || els[i].tagName === "AUDIO")
						els[i].pause();
					check_image_unref(els[i]);
				}
				if (popup.parentNode)
					popup.parentNode.removeChild(popup);
				var index = array_indexof(popups, popup);
				if (index > -1) {
					popups.splice(index, 1);
				}
			});
			if (removepopups_timer) {
				clearTimeout(removepopups_timer);
				removepopups_timer = null;
			}
		}
		var remove_mask = function() {
			if (mask_el) {
				if (mask_el.parentElement)
					mask_el.parentElement.removeChild(mask_el);
				mask_el = null;
			}
			if (removemask_timer) {
				clearTimeout(removemask_timer);
				removemask_timer = null;
			}
		};
		var removemask_timer = null;
		function resetpopups(options) {
			if (_nir_debug_) {
				console_log("resetpopups(", options, ")");
			}
			if (!options) {
				options = {};
			}
			var from_remote = !!options.from_remote;
			array_foreach(popups, function(popup) {
				if (settings.mouseover_fade_time > 0 && (settings.mouseover_enable_fade || settings.mouseover_enable_zoom_effect)) {
					if (settings.mouseover_enable_fade) {
						popup.style.opacity = 0;
					}
					if (settings.mouseover_enable_zoom_effect) {
						popup.style.transform = "scale(0)";
					}
					if (!removepopups_timer) {
						removepopups_timer = setTimeout(removepopups, settings.mouseover_fade_time);
					}
				} else {
					// FIXME: this is called for each popup
					removepopups();
				}
			});
			if (mask_el) {
				set_important_style(mask_el, "pointer-events", "none");
				if (settings.mouseover_mask_fade_time > 0) {
					set_important_style(mask_el, "opacity", 0);
					if (!removemask_timer) {
						removemask_timer = setTimeout(remove_mask, settings.mouseover_mask_fade_time);
					}
				} else {
					remove_mask();
				}
			}
			if (!from_remote && can_use_remote()) {
				if (is_in_iframe) {
					remote_send_message("top", { type: "resetpopups" });
				} else if (popup_el_remote) {
					remote_send_message(popup_el_remote, { type: "resetpopups" });
				}
			}
			disable_click = false;
			popups_active = false;
			delay_handle_triggering = false;
			clear_resetpopup_timeout();
			next_popup_el = null;
			if (popup_el)
				last_popup_el = popup_el;
			popup_el = null;
			real_popup_el = null;
			popup_el_automatic = false;
			popup_el_remote = false;
			popup_el_mediatype = null;
			popup_el_is_stream = false;
			popup_orig_url = null;
			popup_hold_func = common_functions["nullfunc"];
			popup_zoom_func = common_functions["nullfunc"];
			popup_createui_func = common_functions["nullfunc"];
			popup_wheel_cb = null;
			popup_update_pos_func = null;
			popup_update_zoom_func = null;
			popup_client_rect_cache = null;
			popup_is_fullscreen = false;
			last_popup_client_rect_cache = 0;
			popup_media_client_rect_cache = null;
			last_popup_media_client_rect_cache = 0;
			if (!options.automatic) {
				popup_hold = false;
				override_album = null;
			}
			if (!options.new_popup) {
				can_close_popup = [false, false];
			}
			stop_processing();
			if (!options.new_popup || settings.mouseover_wait_use_el) {
				// don't recalculate style until after the popup is open
				stop_waiting();
			}
			if (!delay_mouseonly && delay_handle) {
				clearTimeout(delay_handle);
				delay_handle = null;
			}
		}
		termination_hooks.push(resetpopups);
		function get_viewport() {
			if (window.visualViewport) {
				return [
					window.visualViewport.width,
					window.visualViewport.height
				];
			} else {
				return [
					window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
					window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
				];
			}
		}
		var get_download_urls_from_infoobj;
		(function() {
			var parse_stream = function(delivery, text, url, cb) {
				get_library("stream_parser", settings, do_request, function(sp) {
					if (!sp)
						return cb(null);
					var parser_obj = sp[delivery];
					var parse;
					if (delivery === "dash") {
						parse = parser_obj.parse;
					} else if (delivery === "hls") {
						parse = function(text) {
							var parser = new parser_obj.Parser();
							parser.push(text);
							parser.end();
							return parser.manifest;
						};
					}
					try {
						var parsed = parse(text, url);
					} catch (e) {
						console_error(e);
						return cb(null);
					}
					return cb(parsed);
				});
			};
			// todo: cache, because it's possible more than one has the same url?
			var request_parsed_stream = function(info_obj, manifest_url, cb) {
				var requestobj = override_request({
					url: manifest_url,
					onload: function(resp) {
						if (resp.status !== 200) {
							console_error("Unable to load", resp);
							return cb(null);
						}
						parse_stream(info_obj.media_info.delivery, resp.responseText, resp.finalUrl || manifest_url, function(data) {
							cb(data);
						});
					}
				}, info_obj);
				do_request(requestobj);
			};
			// prefers bandwidth over resolution
			// fixme: is this even correct? this might choose inefficient formats over more efficient ones
			var sort_playlists = function(playlists) {
				return playlists.sort(function(a_obj, b_obj) {
					var a = a_obj.attributes;
					var b = b_obj.attributes;
					if (a.BANDWIDTH && b.BANDWIDTH) {
						return b.BANDWIDTH - a.BANDWIDTH;
					}
					if (a.RESOLUTION && b.RESOLUTION) {
						var a_res = a.RESOLUTION.width * a.RESOLUTION.height;
						var b_res = b.RESOLUTION.width * b.RESOLUTION.height;
						return b_res - a_res;
					}
					// todo: FRAME-RATE?
					return 0;
				});
			};
			var get_actual_best_playlist = function(info_obj, playlists, cb) {
				if (!is_array(playlists))
					playlists = [playlists];
				sort_playlists(playlists);
				var resolve_uri = function(uri) {
					return urljoin(info_obj.url, uri, true);
				};
				var resolve_playlist = function(playlist, cb) {
					if (playlist.uri) {
						playlist.uri = resolve_uri(playlist.uri);
						var uri = playlist.uri;
						//console_log("Requesting", playlist.uri);
						request_parsed_stream(info_obj, uri, function(data) {
							if (!data)
								return cb(null);
							var origattrs = playlist.attributes;
							// should return just a playlist (not a manifest) object for m3u8
							obj_extend(playlist, data);
							// fixme: is this necessary?
							if (origattrs)
								playlist.attributes = origattrs;
							playlist.base_uri = uri;
							playlist.uri = null; // to avoid possible re-requests
							cb(playlist);
						});
					} else {
						cb(playlist);
					}
				};
				var do_process = function(playlist_id, cb) {
					var playlist = playlists[playlist_id];
					if (!playlist)
						return cb(null);
					resolve_playlist(playlist, function(new_playlist) {
						if (!new_playlist)
							return do_process(playlist_id + 1, cb);
						return cb(new_playlist);
					});
				};
				do_process(0, cb);
			};
			var get_downloadable_playlists = function(info_obj, manifest, cb) {
				get_actual_best_playlist(info_obj, manifest.playlists, function(playlist) {
					if (!playlist)
						return cb(null);
					var audio = playlist.attributes.AUDIO;
					if (audio && audio in manifest.mediaGroups.AUDIO) {
						audio = manifest.mediaGroups.AUDIO[audio];
						// todo: somehow add an option to select this
						audio = audio[Object.keys(audio)[0]];
					} else {
						audio = null;
					}
					var retobj = {
						video: playlist
					};
					if (!audio)
						return cb(retobj);
					get_actual_best_playlist(info_obj, audio.playlists || audio, function(audio_pl) {
						if (!audio_pl)
							return cb(null);
						retobj.audio = audio_pl;
						return cb(retobj);
					});
				});
			};
			var get_download_urls_from_playlist = function(info_obj, playlist) {
				var resolve_uri = function(uri) {
					return urljoin(playlist.base_uri || info_obj.url, uri, true);
				};
				// todo
				if (false && playlist.attributes) {
					// dailymotion
					var progressive = playlist.attributes["PROGRESSIVE-URI"];
					if (progressive)
						return [resolve_uri(progressive)];
				}
				var urls = [];
				var push_url = function(url) {
					if (!url)
						return;
					url = resolve_uri(url);
					array_upush(urls, url);
				};
				var push_segment = function(segment) {
					if (segment.map) {
						// only resolvedUri is present for youtube urls
						push_url(segment.map.uri || segment.map.resolvedUri);
					}
					push_url(segment.uri || segment.resolvedUri);
				};
				// youtube
				if (playlist.sidx) {
					push_segment(playlist.sidx);
				}
				array_foreach(playlist.segments, push_segment);
				return urls;
			};
			var get_download_urls_from_playlists = function(info_obj, playlists) {
				var newobj = {};
				obj_foreach(playlists, function(key, value) {
					newobj[key] = get_download_urls_from_playlist(info_obj, value);
				});
				return newobj;
			};
			get_download_urls_from_infoobj = function(info_obj, cb) {
				request_parsed_stream(info_obj, info_obj.url, function(manifest) {
					if (!manifest)
						return cb(null);
					get_downloadable_playlists(info_obj, manifest, function(playlists) {
						if (!playlists)
							return cb(null);
						//console_log("playlists", playlists);
						var urls = get_download_urls_from_playlists(info_obj, playlists);
						//console_log("urls", urls);
						return cb(urls);
					});
				});
			};
		})();
		var check_sharedarraybuffer;
		(function() {
			var check_sharedarraybuffer_inner = function(cb) {
				if (typeof SharedArrayBuffer !== "function") {
					console_warn("SharedArrayBuffer doesn't exist");
					return cb(false);
				}
				try {
					var sab = new SharedArrayBuffer(1);
					var array = new Uint8Array(sab);
					array[0] = 30;
					var workersource = "self.addEventListener('message', function(m) {try {var a = new Uint8Array(m.data); postMessage(a[0] === 30);} catch (e) {postMessage(false);}});";
					new_blob(workersource, function(blob) {
						if (!blob) {
							console_warn("Unable to create blob");
							return cb(false);
						}
						var objurl = create_objecturl(blob);
						var worker = new Worker(objurl);
						worker.onmessage = function(m) {
							cb(!!m.data);
						};
						worker.postMessage(sab);
						setTimeout(function() {
							revoke_objecturl(objurl);
						}, 10);
					});
				} catch (e) {
					console_error(e);
					return cb(false);
				}
			};
			// todo: timeout?
			var cached_sab_success = null;
			check_sharedarraybuffer = function(cb) {
				if (cached_sab_success !== null)
					return cb(cached_sab_success);
				check_sharedarraybuffer_inner(function(success) {
					cached_sab_success = success;
					cb(success);
				});
			};
		})();
		var ffmpeg_progress_cb = null;
		var get_ffmpeg_inner = function(cb) {
			get_library("ffmpeg", settings, do_request, function(ffmpeg_lib) {
				if (!ffmpeg_lib)
					return cb(null);
				if (ffmpeg_lib._imu_failed_loading)
					return cb(null);
				var ffmpeg;
				if (!ffmpeg_lib._imu_instance) {
					if (ffmpeg_lib.overridden_xhr) {
						ffmpeg_lib.xhr.do_request = function(req) {
							//console_log("overriding", req);
							req = override_request(req, {
								headers: {
									Referer: "",
									Origin: ""
								}
							});
							//console_log("requesting", req.url);
							// no need to query this as it's been patched in
							if (/\/ffmpeg-core(?:\.worker)?\.js$/.test(req.url)) {
								req.url = "data:application/javascript,void%200";
							} else if (false && /\/ffmpeg-core\.wasm$/.test(req.url)) {
								//console.trace();
								req.responseType = "blob";
								// somehow helps avoid cache misses
								// no, it seems to work fine without, this also sets Accept-Encoding: identity, which more than doubles the size
								//req.headers = { Range: "bytes=0-" };
								if (true) {
									return do_request(req);
								}
								request_chunked(req, {
									onload: function(data, resp) {
										console_log("onload", data, resp);
										if (!data) {
											resp.status = 500;
											resp.response = null;
											return req.onload(resp);
										}
										resp.response = data.data;
										return req.onload(resp);
									}
								});
								return;
							}
							return do_request(req);
						};
					}
					ffmpeg = ffmpeg_lib.lib.createFFmpeg({
						log: true,
						progress: function(progress) {
							//console_log(progress.ratio);
							if (ffmpeg_progress_cb) {
								ffmpeg_progress_cb(progress.ratio);
							}
						}
					});
					ffmpeg_lib._imu_instance = ffmpeg;
				} else {
					ffmpeg = ffmpeg_lib._imu_instance;
				}
				if (!ffmpeg.isLoaded()) {
					ffmpeg.load().then(function() {
						cb(ffmpeg);
					}, function(err) {
						console_error(err);
						// since compilation takes 100% cpu for a few seconds, we really don't want to run it more than once if it continually fails
						ffmpeg_lib._imu_failed_loading = true; // untested
						cb(null);
					});
				} else {
					cb(ffmpeg);
				}
			});
		};
		var get_ffmpeg = function(cb) {
			if (!has_ffmpeg_lib) {
				console_error("Unable to load FFmpeg library: disabled for this build");
				return cb(null);
			}
			check_sharedarraybuffer(function(success) {
				// if we don't check for this, ffmpeg will hang under firefox
				if (!success) {
					console_error("Unable to load FFmpeg library: SharedArrayBuffer is missing or unusable");
					return cb(null);
				}
				get_ffmpeg_inner(cb);
			});
		};
		var ffmpeg_join;
		(function() {
			var ffmpeg_ops = [];
			var ffmpeg_running = false;
			var ffmpeg_run_single = function(ffmpeg) {
				var opobj = ffmpeg_ops.shift();
				var end = function(no_ops) {
					ffmpeg_progress_cb = null;
					ffmpeg_running = false;
					if (ffmpeg_ops.length) {
						if (!no_ops) {
							ffmpeg_run_single(ffmpeg);
						} else {
							array_foreach(ffmpeg_ops, function(op) {
								run_soon(op.fail);
							});
						}
					}
				};
				ffmpeg_progress_cb = function(percent) {
					if (percent > 1)
						percent = 1;
					opobj.progress(percent);
				};
				ffmpeg_running = true;
				var promise = null;
				try {
					promise = ffmpeg.run.apply(this, opobj.op);
				} catch (e) {
					console_error(e);
					end(true);
					opobj.fail(false);
					return;
				}
				promise.then(function(data) {
					end();
					opobj.success(data);
				}, function(data) {
					end(true);
					opobj.fail(false);
				});
			};
			var ffmpeg_run = function(ffmpeg, op, progress, success, fail) {
				ffmpeg_ops.push({
					op: op,
					progress: progress,
					success: success,
					fail: fail
				});
				if (ffmpeg_running)
					return;
				ffmpeg_run_single(ffmpeg);
			};
			// prefix in case multiple ops are running
			var get_ffmpeg_prefix = function(prefix) {
				return prefix + "_" + get_random_text(10) + "_";
			};
			// files = array of {data: uint8array, mime: ...}, not filenames
			var ffmpeg_concat = function(ffmpeg, files, cb) {
				if (true) {
					var total_size = 0;
					array_foreach(files, function(file) {
						total_size += file.data.byteLength;
					});
					var out = new Uint8Array(total_size);
					var current_size = 0;
					array_foreach(files, function(file) {
						out.set(file.data, current_size);
						current_size += file.data.byteLength;
					});
					var ourfilename = get_ffmpeg_prefix("concat");
					ffmpeg.FS("writeFile", ourfilename, out);
					return cb(ourfilename);
				} else {
					if (!ffmpeg)
						cb(null);
					var prefix = get_ffmpeg_prefix("concat");
					var files_txt_filename = prefix + "files.txt";
					var files_txt_files = [];
					var filenames = [];
					array_foreach(files, function(file, i) {
						// todo: file extensions? are they even necessary?
						var filename = prefix + i;
						if (file.mime) {
							filename += file.mime.replace(/.*\//, ".");
						}
						filenames.push(filename);
						files_txt_files.push("file '" + filename + "'");
						ffmpeg.FS("writeFile", filename, file.data);
					});
					ffmpeg.FS("writeFile", files_txt_filename, files_txt_files.join("\n"));
					var out_filename = prefix + "out";
					var cleanup = function(out) {
						array_foreach(filenames, function(filename) {
							ffmpeg.FS("unlink", filename);
						});
						ffmpeg.FS("unlink", files_txt_filename);
						if (out) {
							try {
								// this can fail if ffmpeg failed to create the out file entirely
								ffmpeg.FS("unlink", out_filename);
							} catch (e) { }
						}
					};
					ffmpeg_run(ffmpeg, ["-f", "concat", "-safe", "0", "-i", files_txt_filename, "-c", "copy", out_filename], null, function() {
						cleanup();
						cb(out_filename);
					}, function(err) {
						console_error(err);
						cleanup(true);
						cb(null);
					});
				}
			};
			var ffmpeg_fs_size = function(ffmpeg, file) {
				try {
					var stat = ffmpeg.FS("stat", file);
					if (!stat)
						return null;
					return stat.size;
				} catch (e) {
					//console_error(e);
					return null;
				}
				;
			};
			var ffmpeg_mux_single = function(ffmpeg, video_file, audio_file, out_filename, progress, success, fail) {
				var failfunc = function(err) {
					try {
						ffmpeg.FS("unlink", out_filename);
					} catch (e) { }
					fail(err);
				};
				var args = [];
				if (video_file)
					args.push("-i", video_file);
				if (audio_file)
					args.push("-i", audio_file);
				args.push("-c", "copy", out_filename);
				ffmpeg_run(ffmpeg, args, progress, function(data) {
					// it'll always succeed, so this is needed to check if it actually wrote the file
					if (!ffmpeg_fs_size(ffmpeg, out_filename)) {
						return failfunc();
					}
					success(data);
				}, failfunc);
			};
			var ffmpeg_mux = function(ffmpeg, video_file, audio_file, progress, cb) {
				if (!ffmpeg)
					return cb(null);
				var prefix = get_ffmpeg_prefix("out");
				var mux_final = function() {
					ffmpeg_mux_single(ffmpeg, video_file, audio_file, prefix + ".mkv", progress, function() { cb(prefix + ".mkv"); }, function(err) {
						console_error("Error muxing into .mkv", err);
						cb(null);
					});
				};
				if (settings.stream_mux_mp4_over_mkv) {
					var mp4_filename = prefix + ".mp4";
					ffmpeg_mux_single(ffmpeg, video_file, audio_file, mp4_filename, function(ratio) {
						if (ratio >= 0.95)
							ratio = 0.95; // hack to avoid removing the progress element on error
						progress(ratio);
					}, function() { cb(mp4_filename); }, function(err) {
						// this means ffmpeg can't be run
						if (err === false) {
							return cb(null);
						}
						//if (err) console_error(err);
						mux_final();
					});
				} else {
					mux_final();
				}
			};
			ffmpeg_join = function(ffmpeg, datas, progress, cb) {
				var streams = [];
				if (datas.video)
					streams.push(datas.video);
				if (datas.audio)
					streams.push(datas.audio);
				if (!streams.length)
					return cb(null);
				var files = [];
				var prefix = get_ffmpeg_prefix("join");
				var cleanup = function() {
					array_foreach(files, function(filename) {
						ffmpeg.FS("unlink", filename);
					});
					progress(1);
				};
				var err = function() {
					cleanup();
					cb(null);
				};
				var process_stream = function(i) {
					if (i >= streams.length) {
						return mux_files();
					} else {
						progress((i / streams.length) * 0.5);
					}
					var stream = streams[i];
					if (!stream.length) {
						// shouldn't happen?
						console_warn("No stream data for", i);
						process_stream(i + 1);
					} else if (stream.length === 1) {
						// no need to concat
						var filename = prefix + "stream" + i;
						ffmpeg.FS("writeFile", filename, stream[0].data);
						files.push(filename);
						process_stream(i + 1);
					} else {
						// todo: progress
						ffmpeg_concat(ffmpeg, stream, function(filename) {
							if (!filename)
								return err();
							files.push(filename);
							process_stream(i + 1);
						});
					}
				};
				var mux_files = function() {
					progress(0.5);
					if (!files.length) {
						console_warn("No files");
						return err();
					}
					// disabling this is inefficient, but otherwise we don't get a file extension
					if (false && files.length === 1) {
						// don't cleanup because it'll delete the file
						return cb(files[0]);
					}
					if (files.length > 2) {
						console_error("Unknown extra file(s)", files);
						return err();
					}
					ffmpeg_mux(ffmpeg, files[0], files[1], function(percent) {
						progress(0.5 + (percent * 0.5));
					}, function(out_file) {
						if (!out_file)
							return err();
						cleanup();
						return cb(out_file);
					});
				};
				process_stream(0);
			};
		})();
		var download_playlist_urls;
		(function() {
			var download_single_urls = function(info_obj, single_urls, progress, cb) {
				// for testing
				//single_urls = single_urls.slice(0, 2);
				var ip = new ImpreciseProgress({
					elements_num: single_urls.length,
					cb: progress
				});
				var urls_data = {};
				var max_run = Math_min(3, single_urls.length);
				var chunks = Math_max(1, ((max_run / 3) * 5) | 0);
				var chunk_size = 2 * 1024 * 1024;
				if (info_obj.max_chunks)
					chunks = Math_min(chunks, info_obj.max_chunks);
				if (chunks === 1)
					chunk_size = 0;
				var running = 0;
				var current_url_i = 0;
				var finished = 0;
				var do_stop = false;
				var request_url = function(url, cb) {
					running++;
					//console_log("requesting", url);
					request_chunked({
						url: url,
						headers: info_obj.headers,
						can_head: info_obj.can_head,
						head_wrong_contentlength: info_obj.head_wrong_contentlength
					}, {
						chunks: chunks,
						chunk_size: chunk_size,
						onload: function(data) {
							running--;
							//console_log("got", url, data);
							if (!data)
								cb(false);
							urls_data[url] = data;
							cb(true);
						},
						onprogress: function(progobj) {
							ip.update_progobj(url, progobj);
						}
					});
				};
				var stop = function() {
					// todo: abort requests
					do_stop = true;
				};
				var run = function() {
					if (do_stop)
						return;
					if (finished >= single_urls.length) {
						var out_urls = [];
						array_foreach(single_urls, function(url) {
							out_urls.push(urls_data[url]);
						});
						return cb(out_urls);
					} else if (current_url_i >= single_urls.length) {
						return;
					}
					for (var i = running; i < max_run; i++) {
						request_url(single_urls[current_url_i++], function(succeeded) {
							finished++;
							if (do_stop)
								return;
							if (!succeeded) {
								stop();
								return cb(null);
							} else {
								run();
							}
						});
					}
				};
				run();
				return {
					abort: stop
				};
			};
			download_playlist_urls = function(info_obj, urls, progress, cb) {
				var ip = new ImpreciseProgress({
					elements_num: Object.keys(urls).length,
					cb: progress
				});
				var final_data = {};
				var handles = {};
				var do_stop = false;
				var stop = function() {
					do_stop = true;
					obj_foreach(handles, function(k, obj) {
						obj.abort();
					});
				};
				obj_foreach(urls, function(type, single_urls) {
					handles[type] = download_single_urls(info_obj, single_urls, function(progobj) {
						ip.update_progobj(type, progobj);
					}, function(urls_data) {
						if (do_stop)
							return;
						if (!urls_data) {
							stop();
							return cb(null);
						}
						final_data[type] = urls_data;
						// todo: improve check?
						if (Object.keys(final_data).length === Object.keys(urls).length) {
							cb(final_data);
						}
					});
				});
			};
		})();
		var shaka_module = function() {
			var get_max_video_quality = function() {
				var max_video_quality = get_single_setting("max_video_quality");
				if (max_video_quality) {
					max_video_quality = parseInt(max_video_quality.substr(1));
				}
				return max_video_quality;
			};
			var get_variant_within_max_quality = function(variants, max_video_quality) {
				var wanted_variant = -1;
				array_foreach(variants, function(variant, i) {
					if (variant.height === max_video_quality) {
						wanted_variant = i;
						return false;
					}
					if (variant.height > max_video_quality) {
						if (i === 0) {
							wanted_variant = i;
						} else {
							wanted_variant = i - 1;
						}
						return false;
					}
				});
				return wanted_variant;
			};
			var add_xhr_hook = function(lib, info_obj) {
				if (lib.overridden_xhr) {
					lib.xhr.do_request = function(data) {
						do_request(override_request(data, info_obj));
					};
				}
			};
			var create_shaka = function(info_obj, el, src, success, fail) {
				get_library("shaka", settings, do_request, function(_shaka) {
					if (!_shaka)
						return fail();
					var shaka = _shaka.lib;
					if (true) {
						shaka.log.setLevel(shaka.log.Level.ERROR);
					} else {
						shaka.log.setLevel(shaka.log.Level.DEBUG);
					}
					//shaka.polyfill.installAll();
					if (!shaka.Player.isBrowserSupported()) {
						console_warn("Unsupported browser for Shaka");
						return fail();
					}
					add_xhr_hook(_shaka, info_obj);
					var player = new shaka.Player(el);
					var shaka_error_handler = function(e) {
						console_error(e);
						return fail();
					};
					player.addEventListener("error", shaka_error_handler);
					var need_buffer = false;
					var ran_success = false;
					player.addEventListener("buffering", function() {
						if (need_buffer && !ran_success) {
							// if this buffering event isn't added, the stream will wait for ~5 seconds before playing if a manual variant is selected
							el.currentTime = el.currentTime - 0.001; // FIXME: is -0.001 needed? it's added to force a manual playback change
							need_buffer = false;
							ran_success = true;
							success();
						}
					});
					player.load(src).then(function() {
						var subs = null;
						if (info_obj.subtitles) {
							var selected = false;
							subs = preprocess_subtitles(info_obj.subtitles);
							for (var _i = 0, subs_2 = subs; _i < subs_2.length; _i++) {
								var subtitle = subs_2[_i];
								var kind = "subtitle";
								var language = subtitle.language_code || "en";
								var title = subtitle.title || null;
								var mime = subtitle.mime || void 0;
								var forced = false;
								player.addTextTrackAsync(subtitle.url, language, kind, mime, undefined, title, forced);
							}
						}
						var text_tracks = player.getTextTracks();
						if (text_tracks && text_tracks.length) {
							player.selectTextTrack(text_tracks[0]); // TODO
						}
						player.setTextTrackVisibility(!!settings.popup_enable_subtitles);
						var variants = player.getVariantTracks();
						if (settings.hls_dash_use_max) {
							variants.sort(function(a, b) {
								return b.bandwidth - a.bandwidth;
							});
							//console_log(variants);
							player.configure("abr.enabled", false);
							player.selectVariantTrack(variants[0], true, 0);
							need_buffer = true;
						}
						var max_video_quality = get_max_video_quality();
						if (max_video_quality) {
							variants.sort(function(a, b) {
								var diff = a.height - b.height;
								if (diff)
									return diff;
								return a.bandwidth - b.bandwidth;
							});
							var wanted_variant = get_variant_within_max_quality(variants, max_video_quality);
							if (wanted_variant >= 0) {
								player.configure("abr.enabled", false);
								player.selectVariantTrack(variants[wanted_variant], true, 0);
								need_buffer = true;
							}
						}
						if (!need_buffer) {
							ran_success = true;
							return success();
						} else {
							// in case the buffering event doesn't run
							setTimeout(function() {
								if (ran_success)
									return;
								ran_success = true;
								success();
							}, 5 * 1000);
						}
					}, shaka_error_handler);
				});
			};
			var shaka_info = {
				el_init: function(info) {
					create_shaka(info.info_obj, info.el, info.src, info.success, info.fail);
				},
				active: function() {
					return settings.allow_thirdparty_libs && get_tprofile_setting("mouseover_allow_hlsdash");
				}
			};
			mediadelivery_support.dash = shaka_info;
			mediadelivery_support.hls = shaka_info;
		};
		shaka_module();
		var parse_styles = function(str, multi) {
			if (typeof str !== "string")
				return;
			str = strip_whitespace(str);
			if (!str)
				return;
			var blocks = {};
			var current_block = "default";
			var splitted = str.split("\n");
			for (var i = 0; i < splitted.length; i++) {
				var current = strip_whitespace(splitted[i]);
				if (!current)
					continue;
				// note: c/css multiline comments (/* */) aren't supported yet
				// c++-style comments
				if (/^\/\//.test(current))
					continue;
				var match = current.match(/^(#[-a-zA-Z0-9]+(?:\s*,\s*#[-a-zA-Z0-9]+){0,})\s*{/);
				if (match) {
					if (current_block !== "default") {
						console_error("Nested blocks aren't supported");
						return;
					}
					current_block = match[1].split(/\s*,\s*/);
					splitted[i--] = current.substr(match[0].length);
					continue;
				}
				if (current[0] === "}") {
					if (current_block === "default") {
						console_error("No block to escape from");
						return;
					}
					current_block = "default";
					continue;
				}
				if (string_indexof(current, ":") < 0)
					continue;
				var next_block = current_block;
				if (current_block !== "default" && /}$/.test(current)) {
					current = strip_whitespace(current.replace(/}$/, ""));
					next_block = "default";
				}
				var property = strip_whitespace(current.replace(/^(.*?)\s*:.*/, "$1"));
				var value = strip_whitespace(current.replace(/^.*?:\s*(.*)$/, "$1"));
				// FIXME: this is extremely hacky in order to avoid writing a better parser
				// doesn't support escapes like \"
				var scolon_pos = string_indexof(value, ";");
				if (scolon_pos >= 0) {
					var quote_pos = value.search(/['"]/);
					if (quote_pos < 0) {
						splitted[i--] = value.substr(scolon_pos + 1);
						value = strip_whitespace(value.substr(0, scolon_pos));
					} else {
						var new_quote_pos = value.substr(quote_pos + 1).search(/['"]/) + quote_pos + 1;
						scolon_pos = string_indexof(value.substr(new_quote_pos + 1), ";");
						if (scolon_pos >= 0) {
							scolon_pos += new_quote_pos + 1;
							splitted[i--] = value.substr(scolon_pos + 1);
							value = strip_whitespace(value.substr(0, scolon_pos));
						}
					}
				}
				var important = false;
				if (value.match(/!important$/)) {
					important = true;
					value = strip_whitespace(value.replace(/!important$/, ""));
				}
				var c_blocks = current_block;
				if (!is_array(c_blocks))
					c_blocks = [c_blocks];
				array_foreach(c_blocks, function(block) {
					var prop_obj = { property: property, value: value, important: important };
					if (!(block in blocks))
						blocks[block] = {};
					if (multi) {
						if (!(property in blocks[block]))
							blocks[block][property] = [];
						blocks[block][property].push(prop_obj);
					} else {
						blocks[block][property] = prop_obj;
					}
				});
				current_block = next_block;
			}
			return blocks;
		};
		function get_processed_styles(str) {
			if (!str || typeof str !== "string" || !strip_whitespace(str))
				return;
			var styles = {};
			var splitted = str.split(/[;\n]/);
			for (var i = 0; i < splitted.length; i++) {
				var current = strip_whitespace(splitted[i]);
				if (!current)
					continue;
				if (string_indexof(current, ":") < 0)
					continue;
				if (/^\s*\/\//.test(current))
					continue;
				var property = strip_whitespace(current.replace(/^(.*?)\s*:.*/, "$1"));
				var value = strip_whitespace(current.replace(/^.*?:\s*(.*)$/, "$1"));
				var important = false;
				if (value.match(/!important$/)) {
					important = true;
					value = strip_whitespace(value.replace(/!important$/, ""));
				}
				styles[property] = { value: value, important: important };
			}
			return styles;
		}
		function get_styletag_styles(str) {
			// TODO: use parse_styles instead
			var styles = get_processed_styles(str);
			if (!styles)
				return;
			var styles_array = [];
			for (var property in styles) {
				var current = property + ": " + styles[property].value;
				if (styles[property].important || true) {
					current += " !important";
				}
				styles_array.push(current);
			}
			return styles_array.join("; ");
		}
		function apply_styles(el, str, options) {
			var style_blocks = parse_styles(str, true);
			if (!style_blocks)
				return;
			// currently unused because revert_styles isn't used anywhere
			if (options.allow_revert) {
				var oldstyle = el.getAttribute("style"); // this can be expensive for `all: initial` styles
				if (oldstyle) {
					el.setAttribute("data-imu-oldstyle", oldstyle);
				}
			}
			var styles = {};
			if ("default" in style_blocks)
				styles = style_blocks["default"];
			if (options.id && ("#" + options.id) in style_blocks) {
				var block = style_blocks["#" + options.id];
				for (var property in block) {
					if (!(property in styles))
						styles[property] = [];
					array_extend(styles[property], block[property]);
				}
			}
			// avoid modifying the source object if format_string adds new variables
			var format_vars = shallowcopy(options.format_vars);
			var iter = function(property, obj) {
				var value = obj.value;
				// todo: maybe handle escape sequences with JSON_parse?
				if (value.match(/^['"].*['"]$/)) {
					value = value.replace(/^["'](.*)["']$/, "$1");
				}
				if (options.old_variables) {
					for (var variable in options.old_variables) {
						value = string_replaceall(value, variable, options.old_variables[variable]);
					}
				}
				if (options.format_vars) {
					var formatted = format_string_single(value, format_vars);
					if (!formatted)
						return;
					value = formatted;
				}
				if (options.properties) {
					if (property in options.properties) {
						options.properties[property](value, property);
					}
				}
				if (obj.important || options.force_important) {
					el.style.setProperty(property, value, "important");
				} else {
					el.style.setProperty(property, value);
				}
				el.setAttribute("data-imu-newstyle", true);
			};
			for (var property in styles) {
				array_foreach(styles[property], function(obj) {
					iter(property, obj);
				});
			}
		}
		function revert_styles(el) {
			var oldstyle = el.getAttribute("data-imu-oldstyle");
			if (oldstyle) {
				el.setAttribute("style", oldstyle);
				el.removeAttribute("data-imu-oldstyle");
			} else if (el.getAttribute("style") && el.getAttribute("data-imu-newstyle")) {
				el.removeAttribute("style");
			}
			el.removeAttribute("data-imu-newstyle");
		}
		function set_important_style(el, property, value) {
			el.style.setProperty(property, value, "important");
		}
		function get_caption(obj, el) {
			if (obj && obj.extra && obj.extra.caption) {
				return strip_whitespace(obj.extra.caption);
			}
			if (el) {
				do {
					// don't use el.title/el.alt because if the element is <form>, it refers to form > input[name="title"]
					var el_title = el.getAttribute("title");
					var el_alt = el.getAttribute("alt");
					if (el_title || el_alt) {
						var caption = el_title || el_alt;
						// When opening an image in a new tab in Firefox, alt is set to the src
						if (caption === el.src)
							return null;
						return strip_whitespace(caption);
					}
				} while ((el = el.parentElement));
			}
			return null;
		}
		function get_el_dimensions(el) {
			var el_tagname = get_tagname(el);
			if (el_tagname === "VIDEO") {
				return [
					el.videoWidth,
					el.videoHeight
				];
			} else if (el_tagname === "CANVAS") {
				return [
					el.width,
					el.height
				];
			} else if (el_tagname === "SVG") {
				return [
					el.width.animVal.value,
					el.height.animVal.value
				];
			} else if (el_tagname === "IMG") {
				var dims = get_image_dims(el);
				return [
					dims.width,
					dims.height
				];
			} else if (el_tagname === "IMG" || el_tagname === "PICTURE") {
				return [
					el.naturalWidth,
					el.naturalHeight
				];
			} else { // e.g. <audio>
				return [
					// .style. is a hack in order to get the dimensions before the element is created
					el.offsetWidth || getUnit(el.style.width),
					el.offsetHeight || getUnit(el.style.height)
				];
			}
		}
		function add_link_to_history(link) {
			if (is_extension) {
				extension_send_message({
					type: "add_to_history",
					data: {
						url: link
					}
				});
			}
		}
		// {}-based
		var parse_format = function(formatstr) {
			var segments = [];
			var push_segment = function() {
				if (!current.length)
					return;
				if (in_bracket) {
					segments.push({ text: current, type: "var" });
				} else {
					segments.push(current);
				}
				current = "";
			};
			var current = "";
			var in_bracket = false;
			var escape = false;
			for (var i = 0; i < formatstr.length; i++) {
				var c = formatstr[i];
				if (c === '\\') {
					if (escape) {
						current += '\\';
					} else {
						escape = true;
					}
					continue;
				}
				if (escape) {
					current += c;
					continue;
				}
				if (c === '{') {
					if (!in_bracket) {
						push_segment();
						in_bracket = true;
						continue;
					}
				} else if (c === '}') {
					if (in_bracket) {
						push_segment();
						in_bracket = false;
						continue;
					}
				}
				current += c;
			}
			push_segment();
			return segments;
		};
		var format_string_single = function(formatstr, vars) {
			// don't need to care about anything after // because / shouldn't be in the filename anyways
			formatstr = formatstr.replace(/\/\/.*/, "");
			formatstr = strip_whitespace(formatstr);
			if (!formatstr)
				return null;
			var parsed = parse_format(formatstr);
			var str = "";
			for (var i = 0; i < parsed.length; i++) {
				if (typeof parsed[i] === "string") {
					str += parsed[i];
				} else {
					var varname = parsed[i].text;
					var default_value = null;
					var compare_value = null;
					var compare_not = false;
					var op = null;
					var compare_flags = [];
					var match = varname.match(/^([^?]+)[?](.*)$/);
					if (match) {
						varname = match[1];
						default_value = match[2];
					}
					match = varname.match(/^([^!/:=]+)([!=]=)(.*)$/);
					if (match) {
						varname = match[1];
						compare_value = match[3];
						compare_not = match[2] === "!=";
						op = "eq";
					}
					match = varname.match(/^([^!/:=]+)(!)?\/([rc]{0,2})=(.*)$/);
					if (match) {
						varname = match[1];
						compare_value = match[4];
						compare_not = match[2] === "!";
						op = "contains";
						var flags = match[3];
						if (string_indexof(flags, "r") >= 0)
							compare_flags.push("regex");
						if (string_indexof(flags, "c") >= 0)
							compare_flags.push("nicase");
					}
					match = varname.match(/^([^!/:=]+):=(.*)$/);
					if (match) {
						varname = match[1];
						compare_value = match[2];
						op = "set";
					}
					var varvalue = vars[varname];
					var match = varname.match(/^(.*?):([0-9]+)(\.)?$/);
					if (match) {
						varvalue = vars[match[1]];
						if (varvalue) {
							var newvalue = varvalue.substr(0, parseInt(match[2]));
							if (match[3]) {
								if (newvalue !== varvalue) {
									// …
									newvalue += "\u2026";
								}
							}
							varvalue = newvalue;
						}
					}
					var usevar = !!varvalue;
					if (varvalue && typeof varvalue === "object") {
						var varobj = varvalue;
						varvalue = "";
						if ("usable" in varobj) {
							usevar = varobj.usable;
						}
						if ("value" in varobj) {
							varvalue = varobj.value;
						}
					}
					if (op) {
						if (usevar) {
							if (op === "eq") {
								usevar = varvalue === compare_value;
							} else if (op === "contains") {
								if (array_indexof(compare_flags, "nicase") < 0) {
									varvalue = varvalue.toLowerCase();
									compare_value = compare_value.toLowerCase(); // fixme: this might not be good for regex
								}
								if (array_indexof(compare_flags, "regex") >= 0) {
									usevar = (new RegExp(compare_value)).test(varvalue);
								} else {
									usevar = string_indexof(varvalue, compare_value) >= 0;
								}
							}
						}
						// not in the usevar block because it may not exist
						if (op === "set") {
							vars[varname] = compare_value;
							usevar = true;
						}
						if (compare_not)
							usevar = !usevar;
						varvalue = "";
					}
					if (!usevar) {
						if (typeof default_value === "string") {
							varvalue = default_value;
						} else {
							return null;
						}
					}
					str += varvalue;
				}
			}
			// if it's a {x==y}{var:=value} rule, this should return a falsey value
			return strip_whitespace(str);
		};
		var pluralify = function(number, forms) {
			if (number === 1) {
				return forms[0];
			} else {
				return forms[1];
			}
		};
		var format_ago = function(delta, max_units) {
			if (!max_units)
				max_units = 2;
			// we don't care about milliseconds
			delta = (delta / 1000) | 0;
			// fixme: this isn't really accurate due to averages
			var units = {
				seconds: delta % 60,
				minutes: ((delta / 60) | 0) % 60,
				hours: ((delta / 60 / 60) | 0) % 24,
				days: ((delta / 60 / 60 / 24) | 0),
				//weeks: ((delta / 60 / 60 / 24 / 7)|0), // is this really needed?
				months: ((delta / 60 / 60 / 24 / 30.4375) | 0), // (365 * 3 + 366) / (12 * 4)
				years: ((delta / 60 / 60 / 24 / 365.25) | 0) // (365 * 3 + 366) / 4
			};
			var mod_units = {
				months_years: 12,
				days_years: 365.25,
				days_months: 30.4375,
				days_weeks: 7
			};
			var unit_names = {
				seconds: "second",
				minutes: "minute",
				hours: "hour",
				days: "day",
				weeks: "week",
				months: "month",
				years: "year"
			};
			var unit_keys = Object.keys(units).reverse();
			var valid_units = [];
			array_foreach(unit_keys, function(unit) {
				if (valid_units.length >= max_units)
					return false;
				var value = units[unit];
				var last_valid = valid_units[valid_units.length - 1];
				if (last_valid) {
					var mod = mod_units[unit + "_" + last_valid[0]];
					if (mod) {
						value = (value % mod) | 0;
					}
				}
				if (!value) {
					// "1 year and 1 day ago" is interesting, but hardly useful. makes the leap year average problem more noticeable
					if (valid_units.length)
						return false;
					return;
				}
				valid_units.push([unit, value]);
			});
			if (!valid_units.length) {
				return null;
			}
			var formatted_units = [];
			array_foreach(valid_units, function(unit_value) {
				var unit = unit_value[0];
				var value = unit_value[1];
				var unit_name = unit_names[unit];
				var proper_name = pluralify(value, [unit_name, unit_name + "s"]);
				formatted_units.push(value + " " + proper_name);
			});
			// fixme for 3 or more
			return formatted_units.join(" and ") + " ago";
		};
		var format_string = function(formatstrs, vars) {
			if (!is_array(formatstrs))
				formatstrs = formatstrs.split("\n");
			for (var i = 0; i < formatstrs.length; i++) {
				var formatted = format_string_single(formatstrs[i], vars);
				if (formatted)
					return formatted;
			}
			return null;
		};
		var fill_obj_filename = function(newobj, url, respdata) {
			if (typeof newobj.filename !== "string")
				newobj.filename = "";
			var modified_date = null;
			var contenttype_ext = null;
			var orig_filename = null;
			var wanted_ext = null;
			if (respdata) {
				try {
					var headers = parse_headers(respdata.responseHeaders);
					for (var h_i = 0; h_i < headers.length; h_i++) {
						var header_name = headers[h_i].name.toLowerCase();
						var header_value = headers[h_i].value;
						if (header_name === "content-disposition") {
							// http://cfile7.uf.tistory.com/original/227CF24E57ABEC701869E7
							// Content-Disposition: inline; filename="160731 LA Kcon stage - 15 copy.jpg"; filename*=UTF-8''160731%20LA%20Kcon%20stage%20-%2015%20copy.jpg
							var loops = 0;
							while (loops < 100 && typeof header_value === "string" && header_value.length > 0) {
								var current_value = header_value.replace(/^\s*([^;]*?)\s*(?:;.*)?$/, "$1");
								//header_value = header_value.replace(/^[^;]*(?:;\s*(.*))?$/, "$1");
								var attr = current_value.replace(/^\s*([^=;]*?)\s*(?:[=;].*)?$/, "$1").toLowerCase();
								var a_match = header_value.match(/^[^=;]*(?:(?:=\s*(?:(?:["']([^'"]*?)["'])|([^;]*?))\s*(;.*)?\s*)|;\s*(.*))?$/);
								if (!a_match) {
									console_error("Header value does not match pattern:", header_value);
									break;
								}
								var a_value = a_match[1] || a_match[2];
								// TODO: implement properly
								/*if (attr === "filename*") {
									newobj.filename = a_value;
								}*/
								if (newobj.filename.length === 0 && attr === "filename" && typeof a_value === "string" && a_value.length > 0) {
									newobj.filename = a_value;
								}
								header_value = a_match[3] || a_match[4];
								loops++;
							}
						} else if (header_name === "content-type") {
							contenttype_ext = get_ext_from_contenttype(header_value);
						} else if (header_name === "last-modified") {
							modified_date = new Date(header_value);
							if (isNaN(modified_date.getTime()))
								modified_date = null;
						}
						if (newobj.filename.length > 0 && contenttype_ext && modified_date) {
							// we found everything we're looking for
							break;
						}
					}
				} catch (e) {
					console_error(e);
				}
				var is_data = /^data:/.test(url);
				if (is_data)
					newobj.filename = "";
				var found_filename_from_url = false;
				if (newobj.filename.length === 0 && !is_data) {
					newobj.filename = url.replace(/.*\/([^?#/]*)(?:[?#].*)?$/, "$1");
					found_filename_from_url = true;
					// Disable as there's no use for this
					if (false && (newobj.filename.split(".").length - 1) === 1) {
						newobj.filename = newobj.filename.replace(/(.*)\.[^.]*?$/, "$1");
					}
				}
				// thanks to fireattack on discord for reporting.
				// test: https://hiyoko-bunko.com/specials/h0xmtix1pv/
				// https://images.microcms-assets.io/protected/ap-northeast-1:92243b3c-cb7c-44e8-9c84-28ba954120c5/service/hiyoko-bunko/media/hb_sns_%E3%82%A4%E3%83%98%E3%82%99%E3%83%B3%E3%83%88%E5%BD%93%E6%97%A5_200831.jpg
				if (found_filename_from_url) {
					newobj.filename = decodeURIComponent(newobj.filename);
				}
				orig_filename = newobj.filename;
				// e.g. for /?...
				if (newobj.filename.length === 0) {
					newobj.filename = "download";
				}
				var filename_split = url_basename(newobj.filename, {
					split_ext: true,
					known_ext: true
				});
				if (contenttype_ext && !filename_split[1]) {
					if (orig_filename.length)
						orig_filename += "." + contenttype_ext;
					newobj.filename += "." + contenttype_ext;
				}
				filename_split = url_basename(newobj.filename, {
					split_ext: true,
					known_ext: true
				});
				if (filename_split[1])
					wanted_ext = filename_split[1];
			}
			// to avoid formatting the filename multiple times
			if (!("_orig_filename" in newobj))
				newobj._orig_filename = orig_filename;
			var format_vars = {
				filename: newobj._orig_filename
			};
			format_vars.host_url = window_location;
			format_vars.host_domain = get_domain_from_url(window_location);
			format_vars.host_domain_nosub = get_domain_nosub(format_vars.host_domain);
			try {
				format_vars.host_title = document.title;
			} catch (e) {
				// only available for browser versions
			}
			if (newobj.url && /^https?:\/\//i.test(newobj.url)) {
				format_vars.url = newobj.url;
				format_vars.domain = get_domain_from_url(newobj.url);
				format_vars.domain_nosub = get_domain_nosub(format_vars.domain);
			}
			// todo: only create when needed
			var create_date = function(name, date) {
				var map = {
					"year": "FullYear",
					"month": "Month",
					"day": "Date",
					"hours": "Hours",
					"minutes": "Minutes",
					"seconds": "Seconds"
				};
				var values = [];
				for (var x in map) {
					var local_value = date["get" + map[x]]();
					var utc_value = date["getUTC" + map[x]]();
					if (x === "month") {
						local_value++;
						utc_value++;
					}
					local_value = zpadnum(local_value, 2);
					utc_value = zpadnum(utc_value, 2);
					values[x] = local_value;
					values[x + "_utc"] = utc_value;
					format_vars[name + "_" + x] = local_value;
					format_vars[name + "_" + x + "_utc"] = utc_value;
				}
				format_vars[name + "_iso"] = values.year + "-" + values.month + "-" + values.day + "T" + values.hours + "-" + values.minutes + "-" + values.seconds;
				format_vars[name + "_iso_utc"] = values.year_utc + "-" + values.month_utc + "-" + values.day_utc + "T" + values.hours_utc + "-" + values.minutes_utc + "-" + values.seconds_utc;
				format_vars[name + "_yyyymmdd"] = values.year + values.month + values.day;
				format_vars[name + "_yyyymmdd_utc"] = values.year_utc + values.month_utc + values.day_utc;
				format_vars[name + "_hhmmss"] = values.hours + values.minutes + values.seconds;
				format_vars[name + "_hhmmss_utc"] = values.hours_utc + values.minutes_utc + values.seconds_utc;
				var ago;
				if (name !== "download" && (ago = format_ago(Date.now() - date.getTime()))) {
					format_vars[name + "_ago"] = ago;
				}
				format_vars[name + "_unix_ms"] = date.getTime();
				format_vars[name + "_unix"] = (date.getTime() / 1000) | 0;
			};
			var created_date = null;
			var updated_date = null;
			var download_date = new Date();
			if (newobj.extra) {
				var extra_copy = [
					"caption",
					"author_username",
					"id"
				];
				array_foreach(extra_copy, function(prop) {
					format_vars[prop] = newobj.extra[prop];
				});
				if (newobj.extra.created_date)
					created_date = new Date(newobj.extra.created_date);
				if (newobj.extra.updated_date)
					updated_date = new Date(newobj.extra.updated_date);
			}
			if (!updated_date && modified_date)
				updated_date = modified_date;
			if (created_date)
				create_date("created", created_date);
			if (updated_date || created_date)
				create_date("updated", updated_date || created_date);
			if (download_date)
				create_date("download", download_date);
			if (created_date || updated_date)
				create_date("date", created_date || updated_date);
			if (format_vars.filename) {
				var ext_split = url_basename(format_vars.filename, {
					split_ext: true,
					known_ext: true
				});
				format_vars.filename_noext = ext_split[0];
				if (wanted_ext)
					format_vars.ext = "." + wanted_ext;
			}
			newobj.format_vars = shallowcopy(format_vars);
			var new_filename = get_filename_from_format(settings.filename_format, format_vars);
			if (new_filename) {
				newobj.filename = new_filename;
			} else {
				newobj.filename = add_filename_ext(newobj.filename, format_vars);
			}
		};
		var format_string_post = function(str, vars) {
			if (str) {
				if (vars.prefix)
					str = vars.prefix + str;
				if (vars.suffix)
					str += vars.suffix;
			}
			return str;
		};
		var add_filename_ext = function(filename, format_vars) {
			filename = format_string_post(filename, format_vars);
			var filename_split = url_basename(filename, {
				split_ext: true,
				known_ext: true
			});
			if (!filename_split[1] && format_vars.ext) {
				filename += format_vars.ext;
			}
			return filename;
		};
		var get_filename_from_format = function(format, format_vars) {
			var formatted = format_string(format, format_vars);
			if (!formatted)
				return null;
			return add_filename_ext(formatted, format_vars);
		};
		function makePopup(obj, orig_url, processing, data) {
			if (_nir_debug_) {
				console_log("makePopup", obj, orig_url, processing, data);
			}
			if (settings.mouseover_add_to_history) {
				add_link_to_history(data.data.obj.url);
			}
			if (orig_url && settings.mouseover_add_thumbnail_to_history) {
				add_link_to_history(orig_url);
			}
			var openb = get_tprofile_single_setting("mouseover_open_behavior");
			if (openb === "newtab" || openb === "newtab_bg" || openb === "download" || openb === "copylink" || openb === "replace") {
				stop_waiting();
				var theobj = data.data.obj;
				// TODO: improve fix (for data: urls)
				if (typeof theobj === "string") {
					theobj = { url: theobj };
				}
				var resp = data.data.resp || data.data.respdata;
				if (resp.finalUrl)
					theobj.url = resp.finalUrl;
				fill_obj_filename(theobj, theobj.url, resp);
				popup_obj = theobj;
				if (openb === "newtab" || openb === "newtab_bg") {
					open_in_tab_imu(theobj, openb === "newtab_bg");
				} else if (openb === "download") {
					download_popup_media();
				} else if (openb === "copylink") {
					clipboard_write_link(theobj.url);
				} else if (openb === "replace") {
					// todo: use popup options instead of replace images options
					var replace_options = get_replace_images_options();
					replace_single_media(replace_options, { el: popup_el }, data, common_functions["nullfunc"]);
				}
				return;
			}
			//var x = mouseX;//mouseAbsX;
			//var y = mouseY;//mouseAbsY;
			var x = data.x;
			var y = data.y;
			if (x === null || x === void 0) {
				x = lastX;
			}
			if (y === null || y === void 0) {
				y = lastY;
			}
			dragged = false;
			dragstart = false;
			var seekstart = false;
			function cb(img, url) {
				if (!img) {
					delay_handle_triggering = false;
					if (processing.running) {
						stop_waiting_cant_load();
					}
					return;
				}
				var is_video = img.tagName === "VIDEO";
				var is_audio = img.tagName === "AUDIO";
				var is_stream = is_video || is_audio;
				var newobj = data.data.obj;
				if (!newobj)
					newobj = {};
				popup_obj = newobj;
				var estop = function(e) {
					e.stopPropagation();
					e.stopImmediatePropagation();
					return true;
				};
				var estop_pd = function(e) {
					e.preventDefault();
					estop(e);
					return true;
				};
				lastX = x;
				lastY = y;
				popupOpenX = x;
				popupOpenY = y;
				popupOpenLastX = x;
				popupOpenLastY = y;
				var initial_zoom_behavior = get_single_setting("mouseover_zoom_behavior");
				var last_zoom_behavior = get_single_setting("mouseover_zoom_use_last");
				var use_last_zoom = false;
				if (popup_last_zoom && (last_zoom_behavior === "always" ||
					(last_zoom_behavior === "gallery" && popup_el_automatic))) {
					use_last_zoom = true;
				}
				//img.onclick = estop;
				//img.onmousedown = estop;
				//img.addEventListener("click", estop, true);
				//img.addEventListener("mousedown", estop, true);
				var bgcolor = "#333";
				var fgcolor = "#fff";
				var textcolor = "#fff";
				var shadowcolor = "rgba(0,0,0,.5)";
				var enable_mask_styles = get_single_setting("mouseover_enable_mask_styles2");
				var old_mask_opacity = 1;
				var setup_mask_el = function(mask) {
					set_el_all_initial(mask);
					set_important_style(mask, "opacity", 1);
					if (enable_mask_styles !== "never") {
						apply_styles(mask, settings.mouseover_mask_styles2, {
							force_important: true
						});
					}
					// this allows us to respect a custom opacity for mouseover_mask_styles
					old_mask_opacity = mask.style.opacity;
					if (enable_mask_styles === "hold") {
						set_important_style(mask, "opacity", 0);
					}
					if (!settings.mouseover_close_click_outside &&
						!settings.mouseover_mask_ignore_clicks) {
						set_important_style(mask, "pointer-events", "none");
					}
					set_important_style(mask, "position", "fixed");
					set_important_style(mask, "z-index", maxzindex - 3);
					set_important_style(mask, "width", "100%");
					set_important_style(mask, "height", "100%");
					set_important_style(mask, "left", "0px");
					set_important_style(mask, "top", "0px");
					if (settings.mouseover_mask_fade_time > 0) {
						set_important_style(mask, "transition", "opacity " + (settings.mouseover_mask_fade_time / 1000.) + "s");
						if (enable_mask_styles !== "hold") {
							if (!popup_el_automatic) {
								set_important_style(mask, "opacity", 0);
								// this is needed in order to make the transition happen
								setTimeout(function() {
									set_important_style(mask, "opacity", old_mask_opacity);
								}, 1);
							} else {
								set_important_style(mask, "opacity", old_mask_opacity);
							}
						}
					}
					// same as the addbtn mousedown stop
					our_addEventListener(mask, "mousedown", function(e) {
						if (!settings.mouseover_close_click_outside)
							return;
						estop(e);
					});
					our_addEventListener(mask, "click", function(e) {
						if (!settings.mouseover_close_click_outside)
							return;
						estop(e);
						set_important_style(mask, "pointer-events", "none");
						resetpopups();
					}, true);
					return mask;
				};
				remove_mask();
				if (settings.mouseover_close_click_outside ||
					settings.mouseover_mask_ignore_clicks ||
					enable_mask_styles !== "never") {
					mask_el = document_createElement("div");
					setup_mask_el(mask_el);
				}
				var outerdiv = document_createElement("div");
				set_el_all_initial(outerdiv);
				set_important_style(outerdiv, "position", "fixed");
				set_important_style(outerdiv, "z-index", maxzindex - 2);
				var zoom_move_effect_enabled = false;
				if (settings.mouseover_fade_time > 0 && !popup_el_automatic) {
					var transition_effects = [];
					var temp_transition_effects = [];
					var fade_s = (settings.mouseover_fade_time / 1000.) + "s";
					if (settings.mouseover_enable_fade) {
						transition_effects.push("opacity " + fade_s);
						set_important_style(outerdiv, "opacity", 0);
					}
					if (settings.mouseover_enable_zoom_effect) {
						transition_effects.push("transform " + fade_s);
						set_important_style(outerdiv, "transform", "scale(0)");
						if (settings.mouseover_zoom_effect_move) {
							temp_transition_effects.push("top " + fade_s);
							temp_transition_effects.push("left " + fade_s);
							zoom_move_effect_enabled = true;
						}
					}
					if (transition_effects.length > 0) {
						var orig_transition_string = transition_effects.join(", ");
						array_extend(transition_effects, temp_transition_effects);
						var temp_transition_string = transition_effects.join(", ");
						set_important_style(outerdiv, "transition", temp_transition_string);
						if (temp_transition_effects.length > 0) {
							setTimeout(function() {
								set_important_style(outerdiv, "transition", orig_transition_string);
							}, settings.mouseover_fade_time);
						}
					}
					// setTimeout is needed in order to make the transition happen
					setTimeout(function() {
						set_important_style(outerdiv, "opacity", 1);
						set_important_style(outerdiv, "transform", "scale(1)");
					}, 1);
				}
				var div = document_createElement("div");
				var popupshown = false;
				set_el_all_initial(div);
				set_important_style(div, "box-shadow", "0 0 15px " + shadowcolor);
				set_important_style(div, "border", "3px solid " + fgcolor);
				set_important_style(div, "position", "relative");
				set_important_style(div, "top", "0px");
				set_important_style(div, "left", "0px");
				set_important_style(div, "display", "block");
				set_important_style(div, "background-color", "rgba(255,255,255,.5)");
				// http://png-pixel.com/
				var transparent_gif = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
				var styles_variables = {};
				if (popup_orig_url && !popup_el_is_stream) {
					styles_variables["%thumburl%"] = encodeuri_ifneeded(popup_orig_url);
				} else {
					styles_variables["%thumburl%"] = transparent_gif;
				}
				if (!is_stream) {
					styles_variables["%fullurl%"] = encodeuri_ifneeded(get_img_src(img));
				} else {
					styles_variables["%fullurl%"] = transparent_gif;
				}
				apply_styles(div, settings.mouseover_styles, {
					force_important: true,
					old_variables: styles_variables
				});
				outerdiv.appendChild(div);
				//div.style.position = "fixed"; // instagram has top: -...px
				//div.style.zIndex = maxzindex - 2;
				//div.onclick = estop;
				//div.onmousedown = estop;
				//div.addEventListener("click", estop, true);
				//div.addEventListener("mousedown", estop, true);
				// useful for instagram
				//disable_click = true;
				var outer_thresh = 16;
				var border_thresh = 20;
				var top_thresh = 30;
				var top_mb = top_thresh - border_thresh;
				var viewport;
				var vw;
				var vh;
				var v_mx = Math_max(x - border_thresh, 0);
				var v_my = Math_max(y - top_thresh, 0);
				var update_vwh = function(x, y) {
					viewport = get_viewport();
					vw = viewport[0];
					vh = viewport[1];
					vw -= border_thresh * 2;
					vh -= border_thresh + top_thresh;
					if (typeof x !== "undefined") {
						v_mx = Math_min(vw, Math_max(x - border_thresh, 0));
						v_my = Math_min(vh, Math_max(y - top_thresh, 0));
					}
				};
				var set_top = function(x) {
					outerdiv.style.top = x + "px";
				};
				var set_left = function(x) {
					outerdiv.style.left = x + "px";
				};
				var set_lefttop = function(xy) {
					set_top(xy[1]);
					set_left(xy[0]);
				};
				// https://stackoverflow.com/a/23270007
				function get_lefttopouter() {
					var style = outerdiv.currentStyle || window.getComputedStyle(outerdiv);
					return [style.marginLeft + style.borderLeftWidth,
						style.marginTop + style.borderTopWidth];
				}
				update_vwh(x, y);
				// TODO: improve
				var set_audio_size = function() {
					if (!is_audio)
						return;
					img.style.width = "500px";
					img.style.minWidth = "500px";
					img.style.height = "50px";
					img.style.minHeight = "50px";
				};
				set_audio_size();
				var el_dimensions = get_el_dimensions(img);
				// FIXME: when this is set, for some reason, some settings like min-width and min-height can't be set under chrome
				if (!is_audio)
					set_el_all_initial(img);
				//set_audio_size();
				var add_link = false;
				if (!is_stream && settings.mouseover_add_link) {
					add_link = true;
				} else if (is_video && settings.mouseover_add_video_link) {
					add_link = true;
				}
				if (add_link) {
					// don't !important because it'll override the waiting cursor for automatic (gallery) popups
					img.style.cursor = "pointer";
				}
				// https://stackoverflow.com/questions/7774814/remove-white-space-below-image
				img.style.verticalAlign = "bottom";
				set_important_style(img, "display", "block");
				var update_img_display = function(style) {
					img.style.setProperty("display", style[0], style[1]);
				};
				var visibility_workarounds = [
					// uBlock Origin on pornhub blocks: video[style*="display: block !important;"]
					{
						domain_nosub: /^pornhub(?:premium)?\./,
						img_display: ["block"]
					},
					{
						domain_nosub: /^pornhub(?:premium)?\./,
						img_display: ["initial", "important"]
					},
					// uBlock Origin on gelbooru blocks:
					//   a[target="_blank"] > img
					//   a[target="_blank"] > div
					// https://github.com/qsniyg/maxurl/issues/430#issuecomment-686768694
					{
						domain_nosub: /^gelbooru\./,
						func: function() {
							var span_el = document_createElement("span");
							span_el.appendChild(img);
							a.appendChild(span_el);
						}
					}
				];
				var check_visibility_workaround = function(workaround) {
					if (workaround.domain_nosub) {
						if (!workaround.domain_nosub.test(host_domain_nosub))
							return false;
					}
					return true;
				};
				var apply_visibility_workaround = function(workaround) {
					if (workaround.img_display) {
						update_img_display(workaround.img_display);
					} else if (workaround.func) {
						workaround.func();
					}
				};
				var check_img_visibility = function() {
					setTimeout(function() {
						var computed = get_computed_style(img);
						if (computed.display !== "none") {
							return;
						}
						while (visibility_workarounds.length > 0) {
							var current_workaround = visibility_workarounds.shift();
							if (!check_visibility_workaround(current_workaround))
								continue;
							apply_visibility_workaround(current_workaround);
							if (visibility_workarounds.length > 0)
								check_img_visibility();
							break;
						}
					}, 50);
				};
				check_img_visibility();
				// https://github.com/qsniyg/maxurl/issues/330
				set_important_style(img, "object-fit", "contain");
				var img_naturalHeight, img_naturalWidth;
				img_naturalWidth = el_dimensions[0];
				img_naturalHeight = el_dimensions[1];
				var imgh = img_naturalHeight;
				var imgw = img_naturalWidth;
				var setup_initial_zoom = function(initial_zoom_behavior, use_last_zoom) {
					var update_sizes = false;
					if (initial_zoom_behavior === "custom" || use_last_zoom) {
						var zoom_percent = settings.mouseover_zoom_custom_percent / 100;
						if (use_last_zoom)
							zoom_percent = popup_last_zoom;
						imgw = Math_max(img_naturalWidth * zoom_percent, 20);
						imgh = Math_max(img_naturalHeight * zoom_percent, 20);
						update_sizes = true;
					} else if (initial_zoom_behavior === "fit" || initial_zoom_behavior === "fill") {
						img.style.maxWidth = vw + "px";
						img.style.maxHeight = vh + "px";
						if (initial_zoom_behavior === "fill" && (img_naturalWidth < vw && img_naturalHeight < vh)) {
							var zoom_percent = 1;
							if (img_naturalHeight > img_naturalWidth) {
								zoom_percent = vh / img_naturalHeight;
							} else {
								zoom_percent = vw / img_naturalWidth;
							}
							imgw *= zoom_percent;
							imgh *= zoom_percent;
							update_sizes = true;
						}
					} else if (initial_zoom_behavior === "full") {
						imgw = img_naturalWidth;
						imgh = img_naturalHeight;
						update_sizes = true;
					}
					if (update_sizes) {
						img.style.maxWidth = imgw + "px";
						img.style.width = img.style.maxWidth;
						img.style.maxHeight = imgh + "px";
						img.style.height = img.style.maxHeight;
					}
				};
				setup_initial_zoom(initial_zoom_behavior, use_last_zoom);
				if (imgh < 20 || imgw < 20) {
					// FIXME: This will stop "custom" percentages with low percentages for small images
					stop_waiting_cant_load();
					console_error("Image too small to popup (" + imgw + "x" + imgh + ")");
					return;
				}
				var get_imghw_for_fit = function(width, height) {
					if (width === void 0)
						width = vw;
					if (height === void 0)
						height = vh;
					//height -= border_thresh * 2;
					//width  -= border_thresh * 2;
					var our_imgh = imgh;
					var our_imgw = imgw;
					if (imgh > height || imgw > width) {
						var ratio;
						if (imgh / height >
							imgw / width) {
							ratio = imgh / height;
						} else {
							ratio = imgw / width;
						}
						our_imgh /= ratio;
						our_imgw /= ratio;
					}
					return [our_imgw, our_imgh];
				};
				function calc_imghw_for_fit(width, height) {
					var new_imghw = get_imghw_for_fit(width, height);
					imgw = new_imghw[0];
					imgh = new_imghw[1];
				}
				if ((initial_zoom_behavior === "fit" || initial_zoom_behavior === "fill") && !use_last_zoom) {
					calc_imghw_for_fit();
				}
				var max_width = settings.mouseover_zoom_max_width || void 0;
				var max_height = settings.mouseover_zoom_max_height || void 0;
				if (max_width || max_height) {
					calc_imghw_for_fit(max_width, max_height);
				}
				popup_update_zoom_func = function(mode) {
					var use_last_zoom = false;
					if (mode === "last") {
						mode = get_single_setting("mouseover_zoom_behavior");
						if (popup_last_zoom)
							use_last_zoom = true;
					}
					setup_initial_zoom(mode, use_last_zoom);
					if (mode === "fit" || mode === "fill")
						calc_imghw_for_fit();
					set_popup_width(imgw, "initial");
					set_popup_height(imgh, "initial");
				};
				popup_update_pos_func = function(x, y, resize) {
					var popup_left, popup_top;
					update_vwh(x, y);
					var sct = scrollTop();
					var scl = scrollLeft();
					sct = scl = 0;
					var overflow_x = imgw > vw;
					var overflow_y = imgh > vh;
					var mouseover_position = get_single_setting("mouseover_position");
					if ((popup_hold && settings.mouseover_hold_position_center) ||
						(settings.mouseover_overflow_position_center && (overflow_x || overflow_y)))
						mouseover_position = "center";
					if (mouseover_position === "cursor") {
						popup_top = sct + Math_min(Math_max(v_my - (imgh / 2), 0), Math_max(vh - imgh, 0));
						popup_left = scl + Math_min(Math_max(v_mx - (imgw / 2), 0), Math_max(vw - imgw, 0));
					} else if (mouseover_position === "center") {
						var origin = get_single_setting("mouseover_overflow_origin");
						var ox = origin[1];
						var oy = origin[2];
						var top_x = 0;
						var top_y = 0;
						var bottom_x = vw - imgw;
						var bottom_y = vh - imgh;
						var middle_x = (vw - imgw) / 2;
						var middle_y = (vh - imgh) / 2;
						var our_x = middle_x;
						var our_y = middle_y;
						if (overflow_x) {
							if (ox === "0") {
								our_x = top_x;
							} else if (ox === "1") {
								our_x = middle_x;
							} else if (ox === "2") {
								our_x = bottom_x;
							}
						}
						if (overflow_y) {
							if (oy === "0") {
								our_y = top_y;
							} else if (oy === "1") {
								our_y = middle_y;
							} else if (oy === "2") {
								our_y = bottom_y;
							}
						}
						popup_top = sct + our_y;
						popup_left = scl + our_x;
					} else if (mouseover_position === "beside_cursor") {
						var update_imghw;
						if (resize) {
							update_imghw = function(w, h) {
								calc_imghw_for_fit(w, h);
							};
						} else {
							update_imghw = common_functions.nullfunc;
						}
						var calc_imgrect = function(w, h) {
							var new_imghw = [imgw, imgh];
							if (resize) {
								new_imghw = get_imghw_for_fit(w, h);
							}
							if (new_imghw[0] > w || new_imghw[1] > h)
								return null;
							return new_imghw;
						};
						var cursor_thresh = border_thresh;
						var ovw = vw - cursor_thresh;
						var ovh = vh - cursor_thresh;
						var calc_imgposd = function(lefttop, info, popupd) {
							var moused = lefttop ? v_mx : v_my;
							var vd = lefttop ? ovw : ovh;
							switch (info) {
								case -1:
									return Math_min(vd - popupd, Math_max(0, moused - (popupd / 2)));
								case 0:
									return Math_max(0, moused - popupd - cursor_thresh);
								case 1:
									return Math_min(vd - popupd, moused + cursor_thresh);
							}
						};
						var all_rects = [
							// top
							[-1, 0, ovw, v_my - cursor_thresh],
							// right
							[1, -1, ovw - v_mx - cursor_thresh, ovh],
							// bottom
							[-1, 1, ovw, ovh - v_my - cursor_thresh],
							// left
							[0, -1, v_mx - cursor_thresh, ovh]
						];
						var rects = [];
						// TODO: move the current popup position to the top
						if (x > viewport[0] / 2) {
							rects.push(all_rects[3]);
						} else {
							rects.push(all_rects[1]);
						}
						if (y > viewport[1] / 2) {
							rects.push(all_rects[0]);
						} else {
							rects.push(all_rects[2]);
						}
						for (var i = 0; i < all_rects.length; i++) {
							if (array_indexof(rects, all_rects[i]) < 0) {
								rects.push(all_rects[i]);
							}
						}
						var largest_rectsize = -1;
						var largest_rect = null;
						var largest_origrect = null;
						for (var i = 0; i < rects.length; i++) {
							var our_rect = calc_imgrect(rects[i][2], rects[i][3]);
							if (!our_rect)
								continue;
							var our_rectsize = our_rect[0] * our_rect[1];
							if (our_rectsize > largest_rectsize) {
								largest_rectsize = our_rectsize;
								largest_rect = our_rect;
								largest_origrect = rects[i];
							}
						}
						if (!largest_origrect) {
							largest_rectsize = -1;
							for (var i = 0; i < rects.length; i++) {
								var rectsize = rects[i][2] * rects[i][3];
								if (rectsize > largest_rectsize) {
									largest_origrect = rects[i];
									largest_rectsize = rectsize;
								}
							}
						}
						if (largest_origrect) {
							update_imghw(largest_origrect[2], largest_origrect[3]);
							popup_top = calc_imgposd(false, largest_origrect[1], imgh);
							popup_left = calc_imgposd(true, largest_origrect[0], imgw);
						} else {
							// ???
						}
					} else if (mouseover_position === "beside_cursor_old") {
						// TODO: maybe improve this to be more interpolated?
						var popupx;
						var popupy;
						var cursor_thresh = border_thresh;
						var ovw = vw - cursor_thresh;
						var ovh = vh - cursor_thresh;
						var update_imghw;
						if (resize) {
							update_imghw = function(w, h) {
								calc_imghw_for_fit(w, h);
							};
						} else {
							update_imghw = common_functions.nullfunc;
						}
						update_imghw(ovw, ovh);
						for (var loop_i = 0; loop_i < (resize ? 16 : 1); loop_i++) {
							if (y > viewport[1] / 2) {
								popupy = v_my - imgh - cursor_thresh;
							} else if (popupy === void 0) {
								popupy = v_my + cursor_thresh;
							}
							if (x > viewport[0] / 2) {
								popupx = v_mx - imgw - cursor_thresh;
							} else if (popupx === void 0) {
								popupx = v_mx + cursor_thresh;
							}
							if (popupy < 0) {
								popupy = 0;
								if (settings.mouseover_prevent_cursor_overlap) {
									update_imghw(ovw, v_my);
									//continue;
								}
							}
							if (popupx < 0) {
								popupx = 0;
								if (settings.mouseover_prevent_cursor_overlap) {
									update_imghw(v_mx, ovh);
									//continue;
								}
							}
							if ((popupy + imgh) > vh) {
								if (settings.mouseover_prevent_cursor_overlap) {
									update_imghw(ovw, ovh - v_my);
									//continue;
								} else {
									popupy = Math_max(vh - imgh - cursor_thresh, 0);
								}
							}
							if ((popupx + imgw) > vw) {
								if (settings.mouseover_prevent_cursor_overlap) {
									update_imghw(ovw - v_mx, ovh);
									//continue;
								} else {
									popupx = Math_max(vw - imgw - cursor_thresh, 0);
								}
							}
							//break;
						}
						popup_top = popupy;
						popup_left = popupx;
					}
					return [
						popup_left + border_thresh,
						popup_top + top_thresh
					];
				};
				var initialpos = popup_update_pos_func(x, y, true);
				if (!zoom_move_effect_enabled) {
					set_lefttop(initialpos);
				} else {
					set_lefttop([x - imgw / 2, y - imgh / 2]);
					setTimeout(function() {
						set_lefttop(initialpos);
					}, 1);
				}
				var set_popup_size_helper = function(size, maxsize, widthheight) {
					if (maxsize === void 0)
						maxsize = size;
					if (typeof size === "number")
						size = size + "px";
					if (typeof maxsize === "number")
						maxsize = maxsize + "px";
					if (widthheight) {
						img.style.width = size;
						img.style.maxWidth = maxsize;
					} else {
						img.style.height = size;
						img.style.maxHeight = maxsize;
					}
				};
				var set_popup_width = function(width, maxwidth) {
					set_popup_size_helper(width, maxwidth, true);
				};
				var set_popup_height = function(height, maxheight) {
					set_popup_size_helper(height, maxheight, false);
				};
				set_popup_width(imgw, "initial");
				set_popup_height(imgh, "initial");
				/*console_log(x - (imgw / 2));
				  console_log(vw);
				  console_log(imgw);
				  console_log(vw - imgw);*/
				function get_defaultopacity() {
					var defaultopacity = (settings.mouseover_ui_opacity / 100);
					if (isNaN(defaultopacity))
						defaultopacity = 1;
					if (defaultopacity > 1)
						defaultopacity = 1;
					if (defaultopacity < 0)
						defaultopacity = 0;
					return defaultopacity;
				}
				var defaultopacity = get_defaultopacity();
				function opacity_hover(el, targetel, action) {
					if (!targetel)
						targetel = el;
					our_addEventListener(el, "mouseover", function(e) {
						targetel.style.opacity = "1.0";
						if (action)
							targetel.style.boxShadow = "0px 0px 5px 1px white";
					}, true);
					our_addEventListener(el, "mouseout", function(e) {
						targetel.style.opacity = get_defaultopacity();
						if (action)
							targetel.style.boxShadow = "none";
					}, true);
				}
				var get_popup_dimensions = function() {
					return [
						(popupshown && outerdiv.clientWidth) || imgw,
						(popupshown && outerdiv.clientHeight) || imgh
					];
				};
				var btndown = false;
				function addbtn(options) {
					var tagname = "span";
					if (typeof options.action === "string")
						tagname = "a";
					// todo: preparse user styles, then set tagname to img if image
					var btn = document_createElement(tagname);
					if (options.action) {
						var do_action = function() {
							return !btn.hasAttribute("data-btn-noaction");
						};
						if (typeof options.action === "object") {
							var old_action = options.action;
							options.action = function() {
								action_handler(old_action);
							};
						}
						// thanks to Noodlers on discord for reporting
						// test: discord emoji picker, mousedown will close it
						our_addEventListener(btn, "mousedown", function(e) {
							e.stopPropagation();
							e.stopImmediatePropagation();
						});
						if (typeof options.action === "function") {
							our_addEventListener(btn, "click", function(e) {
								if (!do_action())
									return;
								//console_log(e);
								e.stopPropagation();
								e.stopImmediatePropagation();
								e.preventDefault();
								options.action();
								return false;
							}, true);
						} else if (typeof options.action === "string") {
							btn.href = options.action;
							btn.target = "_blank";
							btn.setAttribute("rel", "noreferrer");
							our_addEventListener(btn, "click", function(e) {
								e.stopPropagation();
								e.stopImmediatePropagation();
							}, true);
						}
						our_addEventListener(btn, "mouseover", function(e) {
							set_important_style(btn, "box-shadow", "0px 0px 5px 1px white");
						}, true);
						our_addEventListener(btn, "mouseout", function(e) {
							set_important_style(btn, "box-shadow", "none");
						}, true);
					}
					our_addEventListener(btn, "mousedown", function(e) {
						btndown = true;
					}, true);
					our_addEventListener(btn, "mouseup", function(e) {
						btndown = false;
					}, true);
					if (false && !options.istop) {
						opacity_hover(btn, void 0, true);
					} else if (typeof options.text === "object" && options.text.truncated !== options.text.full) {
						our_addEventListener(btn, "mouseover", function(e) {
							var computed_style = get_computed_style(btn);
							set_important_style(btn, "width", computed_style.width || (btn.clientWidth + "px"));
							set_important_style(btn, "height", "initial");
							btn.innerText = options.text.full;
						}, true);
						our_addEventListener(btn, "mouseout", function(e) {
							btn.innerText = options.text.truncated;
							btn.style.width = "initial";
						}, true);
					}
					set_el_all_initial(btn);
					if (options.action) {
						set_important_style(btn, "cursor", "pointer");
					}
					set_important_style(btn, "background", bgcolor);
					set_important_style(btn, "border", "3px solid " + fgcolor);
					set_important_style(btn, "border-radius", "10px");
					// test: https://www.yeshiva.org.il/ (topbarel sets this to ltr, so it must be set to the initial value in order to respect the direction)
					set_important_style(btn, "direction", text_direction);
					// workaround for emojis: https://stackoverflow.com/a/39776303
					if (typeof options.text === "string" && options.text.length === 1 && options.text.charCodeAt(0) > 256) {
						set_important_style(btn, "color", "transparent");
						set_important_style(btn, "text-shadow", "0 0 0 " + textcolor);
					} else {
						set_important_style(btn, "color", textcolor);
					}
					set_important_style(btn, "padding", "4px");
					set_important_style(btn, "line-height", "1em");
					//btn.style.whiteSpace = "nowrap";
					set_important_style(btn, "font-size", "14px");
					set_important_style(btn, "font-family", sans_serif_font);
					//set_important_style(btn, "height", "1em");
					// TODO: cache the styles
					apply_styles(btn, settings.mouseover_ui_styles, {
						id: options.id,
						force_important: true,
						format_vars: newobj.format_vars,
						properties: {
							"-imu-text": function(value) {
								// TODO: support emojis properly
								if (typeof options.text === "object")
									options.text.truncated = value;
								else
									options.text = value;
							},
							"-imu-title": function(value) {
								options.title = value;
							},
							"-imu-image": function(value) {
								options.image = value;
							},
							"-imu-pos": function(value) {
								options.pos = value;
								if (array_indexof(["top-left", "top-middle", "top-right",
									"left", "middle", "right",
									"bottom-left", "bottom-middle", "bottom-right"], value) < 0) {
									console_warn("Invalid pos", value);
									options.pos = "top-left";
								}
							}
						}
					});
					if (options.image) {
						options.text = null;
					}
					set_important_style(btn, "z-index", maxzindex - 1);
					if (false && !options.istop) {
						set_important_style(btn, "position", "absolute");
						set_important_style(btn, "opacity", defaultopacity);
					} else {
						set_important_style(btn, "position", "relative");
						set_important_style(btn, "margin-right", "4px");
					}
					set_important_style(btn, "vertical-align", "top");
					//btn.style.maxWidth = "50%";
					set_important_style(btn, "white-space", "pre-wrap");
					set_important_style(btn, "display", "inline-block");
					if (options.action) {
						set_important_style(btn, "user-select", "none");
					}
					if (typeof options.image === "string") {
						var img = document_createElement("img");
						set_el_all_initial(img);
						set_important_style(img, "padding", "0px");
						set_important_style(img, "margin", "0px");
						set_important_style(img, "display", "inline");
						set_important_style(img, "height", "1em");
						set_important_style(img, "cursor", "inherit");
						img.src = options.image;
						btn.appendChild(img);
					}
					if (options.text) {
						if (typeof options.text === "object" && options.text.link_underline && settings.mouseover_ui_link_underline) {
							set_important_style(btn, "text-decoration", "underline");
						}
						if (typeof options.text === "string") {
							btn.innerText = options.text;
						} else if (typeof options.text === "object") {
							btn.innerText = options.text.truncated;
						}
					}
					if (options.title)
						btn.title = options.title;
					if (options.containers && options.pos) {
						var container = options.containers[options.pos];
						container.appendChild(btn);
						// FIXME: container.clientWidth is 0 until it's visible
						var dimensions = get_popup_dimensions();
						if (container.hasAttribute("data-imu-middle_x")) {
							set_important_style(container, "left", ((dimensions[0] - container.clientWidth) / 2) + "px");
						}
						if (container.hasAttribute("data-imu-middle_y")) {
							set_important_style(container, "top", ((dimensions[1] - container.clientHeight) / 2) + "px");
						}
					}
					return btn;
				}
				var ui_els = [];
				var text_direction = "initial";
				var popup_el_style;
				if (popup_el) {
					popup_el_style = get_computed_style(popup_el);
				} else {
					popup_el_style = get_computed_style(document.body);
				}
				if (popup_el_style && popup_el_style.direction === "rtl") {
					text_direction = "rtl";
				}
				var cached_previmages = 0;
				var cached_nextimages = 0;
				function lraction(isright, is_scroll) {
					trigger_gallery(isright ? 1 : -1, function(changed) {
						if (!changed) {
							if (is_scroll) {
								if (isright && settings.scroll_past_gallery_end_to_close) {
									resetpopups();
									return;
								}
							}
							create_ui();
						}
					});
				}
				var create_containerel = function(x, y, margin, boundingclientrect) {
					var topbarel = document_createElement("div");
					set_el_all_initial(topbarel);
					set_important_style(topbarel, "position", "absolute");
					set_important_style(topbarel, "opacity", defaultopacity);
					if (can_use_subzindex)
						set_important_style(topbarel, "z-index", maxzindex - 1);
					set_important_style(topbarel, "white-space", "nowrap");
					// test: https://www.yeshiva.org.il/
					// otherwise, the buttons are in the wrong order
					set_important_style(topbarel, "direction", "ltr");
					var left = null;
					var top = null;
					var bottom = null;
					var right = null;
					var original_width = imgw || img_naturalWidth;
					var bounding_width = boundingclientrect.width || original_width;
					var bounding_wadd = (bounding_width - original_width) / 2;
					var original_height = imgh || img_naturalHeight;
					var bounding_height = boundingclientrect.height || original_height;
					var bounding_hadd = (bounding_height - original_height) / 2;
					if (x === "left") {
						left = -(margin + bounding_wadd) + "px";
					} else if (x === "middle") {
						left = "calc(50%)";
						topbarel.setAttribute("data-imu-middle_x", "true");
					} else if (x === "right") {
						right = -(margin + bounding_wadd) + "px";
					}
					if (y === "top") {
						top = -(margin + bounding_hadd) + "px";
					} else if (y === "middle") {
						// TODO: add buttons vertically, not horizontally
						top = "calc(50%)";
						topbarel.setAttribute("data-imu-middle_y", "true");
					} else if (y === "bottom") {
						bottom = -(margin + bounding_hadd) + "px";
					}
					//console_log(left, right, top, bottom);
					if (left)
						set_important_style(topbarel, "left", left);
					if (right)
						set_important_style(topbarel, "right", right);
					if (top)
						set_important_style(topbarel, "top", top);
					if (bottom)
						set_important_style(topbarel, "bottom", bottom);
					return topbarel;
				};
				var ui_visible = !!settings.mouseover_ui;
				function create_ui(use_cached_gallery, hide_ui) {
					for (var el_i = 0; el_i < ui_els.length; el_i++) {
						var ui_el = ui_els[el_i];
						ui_el.parentNode.removeChild(ui_el);
					}
					ui_els = [];
					var emi = 14;
					var em1 = emi + "px";
					var emhalf = (emi / 2) + "px";
					var gallerycount_fontsize = "13px";
					var galleryinput_fontsize = "12px";
					var img_boundingClientRect = img.getBoundingClientRect();
					var css_fontcheck = "14px " + sans_serif_font;
					var containers = {};
					var container_metas = {
						"top-left": ["left", "top"],
						"top-middle": ["middle", "top"],
						"top-right": ["right", "top"],
						"left": ["left", "middle"],
						"middle": ["middle", "middle"],
						"right": ["right", "middle"],
						"bottom-left": ["left", "bottom"],
						"bottom-middle": ["middle", "bottom"],
						"bottom-right": ["right", "bottom"]
					};
					obj_foreach(container_metas, function(key, data) {
						containers[key] = create_containerel(data[0], data[1], emi, img_boundingClientRect);
					});
					var do_hide = !settings.mouseover_ui;
					if (hide_ui) {
						if (hide_ui === "toggle") {
							do_hide = ui_visible;
						} else if (hide_ui === true) {
							do_hide = true;
						}
					}
					if (do_hide) {
						// Not sure why this is needed, but without it, clicking and dragging images doesn't work under Firefox (#78)
						outerdiv.appendChild(containers["top-left"]);
						ui_visible = false;
						return;
					} else {
						ui_visible = true;
					}
					for (var pos in containers) {
						opacity_hover(containers[pos]);
						outerdiv.appendChild(containers[pos]);
						ui_els.push(containers[pos]);
					}
					if (settings.mouseover_ui_closebtn) {
						var closebtn = addbtn({
							id: "closebtn",
							// \xD7 = ×
							text: "\xD7",
							title: _("Close") + " (" + _("ESC") + ")",
							action: function() {
								resetpopups();
							},
							pos: "top-left",
							containers: containers
						});
					}
					;
					var get_img_orientation = function() {
						var rotation = get_popup_rotation();
						if (Math_abs(rotation) % 180 == 90) {
							return true;
						} else {
							return false;
						}
					};
					var get_img_width = function() {
						// This is needed if img isn't displayed yet
						return img_boundingClientRect.width || imgw || img_naturalWidth;
					};
					var get_img_height = function() {
						return img_boundingClientRect.height || imgh || img_naturalHeight;
					};
					// TODO: improve
					var get_img_disp_height = function() {
						if (get_img_orientation()) {
							return get_img_width();
						} else {
							return get_img_height();
						}
					};
					var prev_images = 0;
					var next_images = 0;
					var gallery_calcing = false;
					function get_imagesizezoom_text() {
						var text = "";
						var rect_height = get_img_disp_height();
						var zoom_percent = rect_height / img_naturalHeight;
						var currentzoom = parse_int(zoom_percent * 100);
						var filesize = 0;
						if (newobj && newobj.filesize)
							filesize = newobj.filesize;
						var format = "";
						var formatorder = [
							{
								value: img_naturalWidth + "x" + img_naturalHeight,
								valid: settings.mouseover_ui_imagesize,
							},
							{
								value: currentzoom + "%",
								valid_paren: currentzoom !== 100 ? true : false,
								valid: settings.mouseover_ui_zoomlevel
							},
							{
								value: size_to_text(filesize),
								valid: settings.mouseover_ui_filesize && filesize
							}
						];
						var entries = [];
						for (var i = 0; i < formatorder.length; i++) {
							var our_format = formatorder[i];
							if (!our_format.valid)
								continue;
							if (entries.length > 0 && our_format.valid_paren === false)
								continue;
							entries.push(our_format.value);
						}
						if (entries.length === 0)
							return "";
						text = entries[0];
						if (entries.length > 1) {
							text += " (" + entries.slice(1).join(", ") + ")";
						}
						return text;
					}
					if (settings.mouseover_ui_imagesize || settings.mouseover_ui_zoomlevel || settings.mouseover_ui_filesize) {
						var imagesize = addbtn({
							id: "sizeinfo",
							text: get_imagesizezoom_text( /*100*/),
							pos: "top-left",
							containers: containers
						});
						set_important_style(imagesize, "font-size", gallerycount_fontsize);
					}
					var get_imagestotal_text = function() {
						if (gallery_calcing) {
							return _("Loading...");
						}
						if (prev_images + next_images > settings.mouseover_ui_gallerymax) {
							return settings.mouseover_ui_gallerymax + "+";
						} else {
							return (prev_images + 1) + " / " + (prev_images + next_images + 1);
						}
					};
					var update_imagestotal = function() {
						if (images_total_input_active)
							return;
						if (prev_images + next_images > 0 || gallery_calcing) {
							set_important_style(images_total, "display", "inline-block");
							images_total.innerText = get_imagestotal_text();
						} else {
							set_important_style(images_total, "display", "none");
						}
					};
					var imagestotal_input_enable = function() {
						images_total_input_active = true;
						editing_text = true;
						images_total.innerText = "";
						set_important_style(images_total_input, "display", "initial");
						images_total_input.value = prev_images + 1;
						images_total.setAttribute("data-btn-noaction", true);
						images_total.appendChild(images_total_input);
						// https://stackoverflow.com/a/19498477
						setTimeout(function() {
							images_total_input.select();
							images_total_input.setSelectionRange(0, images_total_input.value.length);
						}, 100);
					};
					var imagestotal_input_disable = function() {
						editing_text = false;
						if (!images_total_input_active)
							return;
						set_important_style(images_total_input, "display", "none");
						images_total.removeChild(images_total_input);
						images_total.removeAttribute("data-btn-noaction");
						images_total_input_active = false;
						update_imagestotal();
					};
					var popup_width = (popupshown && outerdiv.clientWidth) || imgw;
					if (settings.mouseover_enable_gallery && settings.mouseover_ui_gallerycounter) {
						var images_total = addbtn({
							id: "gallerycounter",
							text: get_imagestotal_text(),
							action: imagestotal_input_enable,
							pos: "top-left",
							containers: containers
						});
						set_important_style(images_total, "font-size", gallerycount_fontsize);
						set_important_style(images_total, "display", "none");
						var images_total_input = document_createElement("input");
						var images_total_input_active = false;
						set_el_all_initial(images_total_input);
						set_important_style(images_total_input, "display", "none");
						set_important_style(images_total_input, "background-color", "white");
						set_important_style(images_total_input, "font-family", sans_serif_font);
						set_important_style(images_total_input, "font-size", galleryinput_fontsize);
						set_important_style(images_total_input, "padding", "1px");
						set_important_style(images_total_input, "padding-left", "2px");
						set_important_style(images_total_input, "width", "5em");
						our_addEventListener(images_total_input, "mouseout", imagestotal_input_disable);
						our_addEventListener(images_total_input, "keydown", function(e) {
							if (e.which === 13) { // enter
								var parsednum = images_total_input.value.replace(/\s+/g, "");
								if (/^[0-9]+$/.test(parsednum)) {
									parsednum = parseInt(parsednum);
									trigger_gallery(parsednum - (prev_images + 1));
								}
								imagestotal_input_disable();
								e.stopPropagation();
								e.preventDefault();
								return false;
							}
						}, true);
					}
					if (settings.mouseover_ui_optionsbtn) {
						// \u2699 = ⚙
						var optionsbtn = addbtn({
							id: "optionsbtn",
							text: "\u2699",
							title: _("Options"),
							action: get_options_page(),
							pos: "top-left",
							containers: containers
						});
					}
					if (settings.mouseover_ui_downloadbtn) {
						// \u2193 = ↓
						// \ud83e\udc6b = 🡫
						// \uD83E\uDC47 = 🡇
						var download_glyphs = ["\uD83E\uDC47", "\ud83e\udc6b", "\u2193"];
						var download_glyph = get_safe_glyph(css_fontcheck, download_glyphs);
						var downloadbtn = addbtn({
							id: "downloadbtn",
							text: download_glyph,
							title: _("Download (" + get_trigger_key_text(settings.mouseover_download_key) + ")"),
							action: { type: "download" },
							pos: "top-left",
							containers: containers
						});
					}
					if (settings.mouseover_ui_rotationbtns) {
						var get_rotate_title = function(leftright) {
							var btn_name = leftright === "left" ? "Rotate Left" : "Rotate Right";
							return _(btn_name) + " (" + get_trigger_key_text(settings["mouseover_rotate_" + leftright + "_key"]) + ")";
						};
						// \u21B6 = ↶
						var rotateleftbtn = addbtn({
							id: "rotleftbtn",
							text: "\u21B6",
							title: get_rotate_title("left"),
							action: { type: "rotate_left" },
							pos: "top-left",
							containers: containers
						});
						// \u21B7 = ↷
						var rotaterightbtn = addbtn({
							id: "rotrightbtn",
							text: "\u21B7",
							title: get_rotate_title("right"),
							action: { type: "rotate_right" },
							pos: "top-left",
							containers: containers
						});
					}
					if (settings.mouseover_ui_caption) {
						var caption = get_caption(newobj, popup_el);
						var caption_link_page = settings.mouseover_ui_caption_link_page && newobj.extra && newobj.extra.page;
						if (!caption && caption_link_page) {
							caption = "(original page)";
						}
						if (caption) {
							var btntext = caption;
							if (settings.mouseover_ui_wrap_caption) {
								// /10 is arbitrary, but seems to work well
								// TODO: make top-left dynamic
								var chars = parseInt(Math_max(10, Math_min(60, (popup_width - containers["top-left"].clientWidth) / 10)));
								btntext = {
									truncated: truncate_with_ellipsis(caption, chars),
									full: caption,
									link_underline: caption_link_page
								};
							}
							var caption_link = null;
							if (caption_link_page) {
								caption_link = newobj.extra.page;
							}
							var caption_btn = addbtn({
								id: "caption",
								text: btntext,
								title: caption,
								action: caption_link,
								pos: "top-left",
								containers: containers
							});
						}
					}
					var add_lrhover = function(isleft, btnel, action, title) {
						if (!settings.mouseover_enable_gallery || popup_width < 200)
							return;
						var img_height = get_img_disp_height();
						var bottom_heights = 0;
						var top_heights = 20;
						if (is_stream) {
							bottom_heights = 60;
						}
						if (img_height < 100) {
							top_heights = 0;
						}
						var lrheight = img_height - top_heights - bottom_heights;
						if (lrheight < 10)
							return;
						var lrhover = document_createElement("div");
						set_el_all_initial(lrhover);
						lrhover.title = title;
						if (isleft) {
							lrhover.style.left = "0em";
						} else {
							lrhover.style.right = "0em";
						}
						lrhover.style.top = top_heights + "px";
						lrhover.style.height = lrheight + "px";
						lrhover.style.position = "absolute";
						lrhover.style.width = "15%";
						lrhover.style.maxWidth = "200px";
						//lrhover.style.height = "100%";
						lrhover.style.zIndex = maxzindex - 2;
						lrhover.style.cursor = "pointer";
						opacity_hover(lrhover, btnel, true);
						our_addEventListener(lrhover, "click", function(e) {
							if (dragged) {
								return false;
							}
							estop(e);
							action(e);
							return false;
						}, true);
						outerdiv.appendChild(lrhover);
						ui_els.push(lrhover);
						return lrhover;
					};
					var add_leftright_gallery_button = function(leftright) {
						if (!settings.mouseover_enable_gallery || !settings.mouseover_ui_gallerybtns)
							return;
						var action = function() {
							return lraction(leftright);
						};
						var name = leftright ? "Next" : "Previous";
						// \u2190 = ←
						// \ud83e\udc50 = 🡐
						var left_glyphs = ["\ud83e\udc50", "\u2190"];
						// \u2192 = →
						// \ud83e\udc52 = 🡒
						var right_glyphs = ["\ud83e\udc52", "\u2192"];
						var lr_glyphs = leftright ? right_glyphs : left_glyphs;
						var icon = get_safe_glyph(css_fontcheck, lr_glyphs);
						var keybinding = leftright ? settings.mouseover_gallery_next_key : settings.mouseover_gallery_prev_key;
						var keybinding_text = get_trigger_key_text(keybinding);
						var title = _(name) + " (" + _(keybinding_text) + ")";
						var id = "gallery";
						id += leftright ? "next" : "prev";
						id += "btn";
						var btn = addbtn({
							id: id,
							text: icon,
							title: title,
							action: action,
							containers: containers,
							pos: leftright ? "right" : "left"
						});
						/*btn.style.top = "calc(50% - 7px - " + emhalf + ")";
						if (!leftright) {
							btn.style.left = "-" + em1;
						} else {
							btn.style.left = "initial";
							btn.style.right = "-" + em1;
						}*/
						//outerdiv.appendChild(btn);
						//ui_els.push(btn);
						add_lrhover(!leftright, btn, action, title);
						if (settings.mouseover_enable_gallery && settings.mouseover_ui_gallerycounter) {
							if (use_cached_gallery) {
								if (!leftright) {
									prev_images = cached_previmages;
								} else {
									next_images = cached_nextimages;
								}
								update_imagestotal();
							} else {
								gallery_calcing = true;
								count_gallery(leftright, void 0, true, void 0, void 0, function(total) {
									gallery_calcing = false;
									if (!leftright) {
										prev_images = total;
										cached_previmages = prev_images;
									} else {
										next_images = total;
										cached_nextimages = next_images;
									}
									update_imagestotal();
								});
								setTimeout(update_imagestotal, 1);
							}
						}
					};
					var add_leftright_gallery_button_if_valid = function(leftright) {
						if (!settings.mouseover_enable_gallery)
							return;
						is_nextprev_valid(leftright, function(valid) {
							if (valid) {
								add_leftright_gallery_button(leftright);
							}
						});
					};
					add_leftright_gallery_button_if_valid(false);
					add_leftright_gallery_button_if_valid(true);
				}
				popup_createui_func = create_ui;
				fill_obj_filename(newobj, url, data.data.respdata);
				create_ui();
				var a = document_createElement("a");
				set_el_all_initial(a);
				if (add_link) {
					a.style.cursor = "pointer";
					//a.addEventListener("click", function(e) {
					a.onclick = function(e) {
						e.stopPropagation();
						e.stopImmediatePropagation();
						return true;
					};
				}
				a.style.setProperty("vertical-align", "bottom", "important");
				a.style.setProperty("display", "block", "important");
				var update_popup_clickthrough = function(clickthrough) {
					var value = "none";
					if (!clickthrough)
						value = "initial";
					set_important_style(a, "pointer-events", value);
					set_important_style(img, "pointer-events", value);
					set_important_style(div, "pointer-events", value);
					set_important_style(outerdiv, "pointer-events", value);
				};
				if (settings.mouseover_clickthrough)
					update_popup_clickthrough(true);
				popup_hold_func = function() {
					var enable_mask_styles = get_single_setting("mouseover_enable_mask_styles2");
					if (popup_hold) {
						if (settings.mouseover_hold_unclickthrough) {
							update_popup_clickthrough(false);
						}
						if (mask_el && (enable_mask_styles === "always" || enable_mask_styles === "hold")) {
							mask_el.style.opacity = old_mask_opacity;
						}
					} else {
						if (settings.mouseover_clickthrough) {
							update_popup_clickthrough(true);
						} else {
							update_popup_clickthrough(false);
						}
						if (mask_el && (enable_mask_styles === "hold" || enable_mask_styles === "never")) {
							mask_el.style.opacity = 0;
						}
					}
				};
				if (add_link) {
					a.href = url;
					// set this here instead of outside this block for gelbooru: https://github.com/qsniyg/maxurl/issues/430
					a.target = "_blank";
					if (settings.mouseover_download) {
						if (false) {
							a.href = img.src;
							if (newobj.filename.length > 0) {
								a.setAttribute("download", newobj.filename);
							} else {
								var attr = document.createAttribute("download");
								a.setAttributeNode(attr);
							}
						} else {
							a.href = "#"; // fixme: is this really required? this prevents it from right click->copy link location, etc.
							our_addEventListener(a, "click", function(e) {
								download_popup_media();
								e.preventDefault();
								e.stopPropagation();
								return false;
							}, true);
						}
					}
				} else {
					var click_close = false;
					if (!is_stream && settings.mouseover_click_image_close) {
						click_close = true;
					} else if (is_video && settings.mouseover_click_video_close) {
						click_close = true;
					}
					// TODO: what about audio?
					if (click_close) {
						our_addEventListener(a, "click", function(e) {
							if (dragged)
								return;
							resetpopups();
							e.preventDefault();
							e.stopPropagation();
							return false;
						});
					}
				}
				a.appendChild(img);
				div.appendChild(a);
				popup_hidecursor_timer = null;
				var orig_a_cursor = a.style.cursor;
				var orig_img_cursor = img.style.cursor;
				popup_hidecursor_func = function(hide) {
					popup_cursorjitterX = mouseX;
					popup_cursorjitterY = mouseY;
					if (settings.mouseover_hide_cursor && hide) {
						a.style.cursor = "none";
						img.style.cursor = "none";
					} else {
						if (popup_hidecursor_timer) {
							clearTimeout(popup_hidecursor_timer);
							popup_hidecursor_timer = null;
						}
						a.style.cursor = orig_a_cursor;
						img.style.cursor = orig_img_cursor;
					}
				};
				popup_cursorjitterX = Infinity;
				popup_cursorjitterY = Infinity;
				if (settings.mouseover_hide_cursor && settings.mouseover_hide_cursor_after <= 0) {
					popup_hidecursor_func(true);
				}
				div.onmouseover = div.onmousemove = function(e) {
					if ((Math_abs(mouseX - popup_cursorjitterX) < settings.mouseover_mouse_inactivity_jitter) &&
						(Math_abs(mouseY - popup_cursorjitterY) < settings.mouseover_mouse_inactivity_jitter)) {
						return;
					}
					if (settings.mouseover_hide_cursor_after > 0 || !settings.mouseover_hide_cursor) {
						popup_hidecursor_func(false);
						if (settings.mouseover_hide_cursor) {
							popup_hidecursor_timer = setTimeout(function() {
								popup_hidecursor_func(true);
							}, settings.mouseover_hide_cursor_after);
						}
					}
				};
				function startdrag(e) {
					dragstart = true;
					dragged = false;
					dragstartX = e.clientX;
					dragstartY = e.clientY;
					dragoffsetX = dragstartX - parseFloat(outerdiv.style.left);
					dragoffsetY = dragstartY - parseFloat(outerdiv.style.top);
				}
				// TODO: allow this to be live-reloaded
				if (get_single_setting("mouseover_pan_behavior") === "drag") {
					if (is_stream) {
						img.onseeking = function(e) {
							seekstart = true;
						};
						img.onseeked = function(e) {
							seekstart = false;
						};
					}
					div.ondragstart = a.ondragstart = img.ondragstart = function(e) {
						if (seekstart)
							return;
						//dragstart = true;
						//dragged = false;
						startdrag(e);
						//e.stopPropagation();
						estop(e);
						return false;
					};
					//div.ondrop = estop;
					div.onmousedown = div.onpointerdown = a.onmousedown = a.onpointerdown = function(e) {
						//console_log("(div,a).mousedown", e);
						if (btndown || e.button !== 0 || seekstart)
							return;
						//dragstart = true;
						//dragged = false;
						startdrag(e);
						e.preventDefault();
						estop(e);
						return false;
					};
					img.onmousedown = img.onpointerdown = function(e) {
						//console_log("img.onmousedown", e);
						if (btndown || e.button !== 0 || seekstart)
							return;
						//dragstart = true;
						//dragged = false;
						startdrag(e);
						estop(e);
						return true;
					};
					a.onclick = function(e) {
						//console_log("a.onclick", e);
						dragstart = false;
						if (dragged) {
							estop(e);
							dragged = false;
							return false;
						}
						e.stopPropagation();
						e.stopImmediatePropagation();
						return true;
					};
					div.onmouseup = div.onpointerup = div.onclick = a.onmouseup = a.onpointerup = /*a.onclick =*/ function(e) {
						//console_log("(div,a).mouseup", e);
						dragstart = false;
						if (dragged) {
							//estop(e);
							return false;
						}
						e.stopPropagation();
						e.stopImmediatePropagation();
						return true;
					};
					// Enabling this makes buttons not work after clicking the link
					//div.addEventListener("click", div.onclick, true);
					//a.addEventListener("click", a.onclick, true);
					img.onmouseup = img.onpointerup = img.onclick = function(e) {
						//console_log("img.mouseup", e);
						dragstart = false;
						//estop(e);
						return true;
					};
					if (is_video) {
						img.onclick = function(e) {
							if (img.controls)
								return;
							if (!dragged) {
								if (!img.paused) {
									img.pause();
								} else {
									play_video(img);
								}
							}
							//console_log("img.mouseup", e);
							dragstart = false;
							//estop(e);
							return true;
						};
					}
				}
				var currentmode = initial_zoom_behavior;
				if (currentmode === "fill")
					currentmode = "fit";
				popup_zoom_func = function(zoom_mode, zoomdir, x, y, zoom_out_to_close) {
					var changed = false;
					var popup_left = parseFloat(outerdiv.style.left);
					var popup_top = parseFloat(outerdiv.style.top);
					var popup_width = outerdiv.clientWidth;
					var popup_height = outerdiv.clientHeight;
					update_vwh();
					if (x === void 0)
						x = "center";
					if (y === void 0)
						y = "center";
					// used by pagemiddle, determines the final desired global position
					var x_moveto = null;
					var y_moveto = null;
					if (zoomdir > 0) {
						var zoomout_mode = get_single_setting("scroll_zoomout_pagemiddle");
						if (zoomout_mode === "always") {
							x = "pagemiddle";
							y = "pagemiddle";
						} else if (zoomout_mode === "viewport") {
							if (popup_width < vw)
								x = "pagemiddle";
							if (popup_height < vh)
								y = "pagemiddle";
						}
					}
					// TODO: if mouse is within the popup, use the mouse's coordinates instead
					//   This will have to check the zoom_origin setting.
					if (x === "center" || x === "pagemiddle") {
						if (x === "pagemiddle")
							x_moveto = vw / 2;
						var visible_left = Math_max(popup_left, 0);
						var visible_right = Math_min(visible_left + popup_width, vw);
						// get the middle of the visible portion of the popup
						x = visible_left + (visible_right - visible_left) / 2;
					} else {
						// ensure it's clamped, e.g. when scrolling on the document instead of the popup
						if (x < popup_left)
							x = popup_left;
						else if (x > popup_left + popup_width)
							x = popup_left + popup_width;
					}
					if (y === "center" || y === "pagemiddle") {
						if (y === "pagemiddle")
							y_moveto = vh / 2;
						var visible_top = Math_max(popup_top, 0);
						var visible_bottom = Math_min(visible_top + popup_height, vh);
						y = visible_top + (visible_bottom - visible_top) / 2;
					} else {
						if (y < popup_top)
							y = popup_top;
						else if (y > popup_top + popup_height)
							y = popup_top + popup_height;
					}
					var offsetX = x - popup_left;
					var offsetY = y - popup_top;
					var percentX = offsetX / popup_width;
					var percentY = offsetY / popup_height;
					if (zoom_mode === "fitfull") {
						if (zoom_out_to_close && currentmode === "fit" && zoomdir > 0) {
							resetpopups();
							return false;
						}
						if (zoomdir > 0 && currentmode !== "fit") {
							imgh = img_naturalHeight;
							imgw = img_naturalWidth;
							calc_imghw_for_fit();
							var oldwidth = parseFloat(img.style.width);
							var oldheight = parseFloat(img.style.height);
							set_popup_width(imgw, vw);
							set_popup_height(imgh, vh);
							if (zoom_out_to_close && parseFloat(img.style.width) === oldwidth && parseFloat(img.style.height) === oldheight) {
								resetpopups();
								return false;
							}
							currentmode = "fit";
							changed = true;
						} else if (zoomdir < 0 && currentmode !== "full") {
							set_popup_width(img_naturalWidth, "initial");
							set_popup_height(img_naturalHeight, "initial");
							imgw = img_naturalWidth;
							imgh = img_naturalHeight;
							currentmode = "full";
							changed = true;
						}
					} else if (zoom_mode === "incremental") {
						var imgwidth = img.clientWidth;
						var imgheight = img.clientHeight;
						var mult = 1;
						if (imgwidth < img_naturalWidth) {
							mult = img_naturalWidth / imgwidth;
						} else {
							mult = imgwidth / img_naturalWidth;
						}
						var increment = settings.scroll_incremental_mult - 1;
						mult = Math_round(mult / increment);
						mult *= increment;
						if (imgwidth < img_naturalWidth) {
							if (mult !== 0)
								mult = 1 / mult;
						}
						if (zoomdir > 0) {
							mult /= 1 + increment;
						} else {
							mult *= 1 + increment;
						}
						imgwidth = img_naturalWidth * mult;
						imgheight = img_naturalHeight * mult;
						var too_small = zoomdir > 0 && (imgwidth < 64 || imgheight < 64);
						var too_big = zoomdir < 0 && (imgwidth > img_naturalWidth * 512 || imgheight > img_naturalHeight * 512);
						if (too_small || too_big) {
							if (zoom_out_to_close && too_small)
								resetpopups();
							return false;
						}
						imgw = imgwidth;
						imgh = imgheight;
						set_popup_width(imgwidth);
						set_popup_height(imgheight);
						changed = true;
					}
					if (!changed)
						return false;
					var imgwidth = outerdiv.clientWidth;
					var imgheight = outerdiv.clientHeight;
					var current_zoom = ((imgwidth / img_naturalWidth) + (imgheight / img_naturalHeight)) / 2;
					if (current_zoom) {
						popup_last_zoom = current_zoom;
					}
					var newx, newy;
					var zoom_lerp = function(wantedpos, origpos, viewport) {
						var change = wantedpos - origpos;
						var maxchange = Math_max(100, viewport / 10); // arbitrary numbers
						if (change < 0) {
							change = -Math_min(maxchange, -change);
						} else {
							change = Math_min(maxchange, change);
						}
						return origpos + change;
					};
					if (true || (imgwidth <= vw && imgheight <= vh) || zoom_mode === "incremental") {
						// centers wanted region to pointer
						newx = (x - percentX * imgwidth);
						if (x_moveto !== null) {
							newx = zoom_lerp(x_moveto - imgwidth / 2, newx, vw);
						}
						newy = (y - percentY * imgheight);
						if (y_moveto !== null) {
							newy = zoom_lerp(y_moveto - imgheight / 2, newy, vh);
						}
					} else if (imgwidth > vw || imgheight > vh) {
						// centers wanted region to center of screen
						newx = (vw / 2) - percentX * imgwidth;
						var endx = newx + imgwidth;
						if (newx > border_thresh && endx > (vw - border_thresh))
							newx = Math_max(border_thresh, (vw + border_thresh) - imgwidth);
						if (newx < border_thresh && endx < (vw - border_thresh))
							newx = Math_min(border_thresh, (vw + border_thresh) - imgwidth);
						newy = (vh / 2) - percentY * imgheight;
						var endy = newy + imgheight;
						if (newy > border_thresh && endy > (vh - border_thresh))
							newy = Math_max(border_thresh, (vh + border_thresh) - imgheight);
						if (newy < border_thresh && endy < (vh - border_thresh))
							newy = Math_min(border_thresh, (vh + border_thresh) - imgheight);
					}
					// fitfull only because incremental is under user control
					if (zoom_mode === "fitfull" && imgwidth <= vw && imgheight <= vh) {
						newx = Math_max(newx, border_thresh);
						if (newx + imgwidth > (vw - border_thresh)) {
							newx = (vw + border_thresh) - imgwidth;
						}
						newy = Math_max(newy, border_thresh);
						if (newy + imgheight > (vh - border_thresh)) {
							newy = (vh + border_thresh) - imgheight;
						}
					}
					//var lefttop = get_lefttopouter();
					outerdiv.style.left = (newx /* - lefttop[0]*/) + "px";
					outerdiv.style.top = (newy /* - lefttop[1]*/) + "px";
					create_ui(true);
					// The mouse could accidentally land outside the image in theory
					mouse_in_image_yet = false;
					return false;
				};
				outerdiv.onwheel = popup_wheel_cb = function(e, is_document) {
					var handledx = false;
					var handledy = false;
					var handle_seek = function(xy) {
						var isright = false;
						if (xy) {
							if (e.deltaX < 0)
								isright = false;
							else if (e.deltaX > 0)
								isright = true;
							else
								return;
						} else {
							if (e.deltaY < 0)
								isright = false;
							else if (e.deltaY > 0)
								isright = true;
							else
								return;
							if (settings.mouseover_scrolly_video_invert)
								isright = !isright;
						}
						seek_popup_video(!isright);
						estop_pd(e);
						return true;
					};
					var actionx = true;
					var actiony = true;
					if (is_stream) {
						var video_scrollx = get_single_setting("mouseover_scrollx_video_behavior");
						var video_scrolly = get_single_setting("mouseover_scrolly_video_behavior");
						if (!handledx && video_scrollx !== "default") {
							if (video_scrollx === "seek") {
								if (handle_seek(true)) {
									handledx = true;
								}
							} else if (video_scrollx === "nothing") {
								actionx = false;
							}
						}
						if (!handledy && video_scrolly !== "default") {
							if (video_scrolly === "seek") {
								if (handle_seek(false)) {
									handledy = true;
								}
							} else if (video_scrollx === "nothing") {
								actiony = false;
							}
						}
					}
					var scrollx_behavior = get_single_setting("mouseover_scrollx_behavior");
					var scrolly_behavior = get_single_setting("mouseover_scrolly_behavior");
					if (popup_hold) {
						var hold_scrollx_behavior = get_single_setting("mouseover_scrollx_hold_behavior");
						var hold_scrolly_behavior = get_single_setting("mouseover_scrolly_hold_behavior");
						if (hold_scrollx_behavior !== "default")
							scrollx_behavior = hold_scrollx_behavior;
						if (hold_scrolly_behavior !== "default")
							scrolly_behavior = hold_scrolly_behavior;
					}
					var handle_gallery = function(xy) {
						if (!settings.mouseover_enable_gallery)
							return;
						var isright = false;
						if (xy) {
							if (e.deltaX < 0)
								isright = false;
							else if (e.deltaX > 0)
								isright = true;
							else
								return;
						} else {
							if (e.deltaY < 0)
								isright = false;
							else if (e.deltaY > 0)
								isright = true;
							else
								return;
						}
						lraction(isright, true);
						estop_pd(e);
						return true;
					};
					if (actionx && !handledx) {
						if (scrollx_behavior === "pan") {
							outerdiv.style.left = (parseInt(outerdiv.style.left) + e.deltaX) + "px";
							handledx = true;
						} else if (scrollx_behavior === "gallery") {
							if (handle_gallery(true)) {
								return;
							}
							handledx = true;
						}
					}
					if (actiony && !handledy) {
						if (scrolly_behavior === "pan") {
							outerdiv.style.top = (parseInt(outerdiv.style.top) + e.deltaY) + "px";
							handledy = true;
						} else if (scrolly_behavior === "gallery") {
							if (handle_gallery(false)) {
								return;
							}
							handledy = true;
						}
					}
					if (handledy) {
						estop_pd(e);
						return false;
					}
					if (!actiony || scrolly_behavior !== "zoom" || e.deltaY === 0) {
						return;
					}
					estop_pd(e);
					var cursor_x = e.clientX;
					var cursor_y = e.clientY;
					if (get_single_setting("scroll_zoom_origin") === "center") {
						cursor_x = "center";
						cursor_y = "center";
					}
					var zoom_mode = get_single_setting("scroll_zoom_behavior");
					if (popup_zoom_func(zoom_mode, e.deltaY, cursor_x, cursor_y, settings.zoom_out_to_close) === false)
						return false;
				};
				if (mask_el) {
					document.documentElement.appendChild(mask_el);
				}
				document.documentElement.appendChild(outerdiv);
				removepopups();
				check_image_ref(img);
				// even if autoplay is enabled, if the element is cached, it won't play automatically
				if (is_stream) {
					if (settings.mouseover_video_autoplay) {
						play_video(img);
					} else {
						img.pause();
					}
				}
				popups.push(outerdiv);
				popupshown = true;
				if (data.data.respdata && data.data.respdata.responseHeaders) {
					var parsed_headers = headers_list_to_dict(parse_headers(data.data.respdata.responseHeaders));
					if ("content-length" in parsed_headers) {
						popup_contentlength = parseInt(parsed_headers["content-length"]) || 0;
					}
				}
				//can_close_popup = [false, false];
				// don't set [0] to false, in case "Keep popup open until" == Any/All and keys are released before popup opens
				can_close_popup[1] = false;
				// don't unhold if in gallery
				if (!popup_el_automatic)
					popup_hold = false;
				mouse_in_image_yet = false;
				delay_handle_triggering = false;
				// causes issues with "Don't close until mouse leaves" if the mouse doesn't move
				if (false && popup_trigger_reason !== "mouse") {
					can_close_popup[1] = true;
				}
				setTimeout(function() {
					dont_wait_anymore();
				}, 1);
				popups_active = true;
				//console_log(div);
				add_resetpopup_timeout();
			}
			cb(data.data.img, data.data.newurl /*, obj*/);
		}
		var getunit_el = null;
		var getunit_cache = new IMUCache();
		// getUnit is really slow, e.g. on forbiddenplanet.com (max-width: 39em)
		function getUnit(unit) {
			if (unit.match(/^ *([0-9]+)px *$/)) {
				return unit.replace(/^ *([0-9]+)px *$/, "$1");
			}
			if (getunit_cache.has(unit)) {
				return getunit_cache.get(unit);
			}
			// Based on https://github.com/tysonmatanich/getEmPixels/blob/master/getEmPixels.js
			// /*! getEmPixels  | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT */
			var important = "!important;";
			var style = "position:absolute!important;visibility:hidden!important;width:" + unit + "!important;font-size:" + unit + "!important;padding:0!important";
			var extraBody;
			var unitel = document.body;
			if (!unitel) {
				// Emulate the documentElement to get rem value (documentElement does not work in IE6-7)
				unitel = extraBody = document_createElement("body");
				extraBody.style.cssText = "font-size:" + unit + "!important;";
				document.documentElement.insertBefore(extraBody, document.body);
			}
			// Create and style a test element
			if (!getunit_el) {
				getunit_el = document_createElement("i");
				set_el_all_initial(getunit_el);
				set_important_style(getunit_el, "position", "absolute");
				set_important_style(getunit_el, "visibility", "hidden");
				set_important_style(getunit_el, "padding", "0");
			}
			set_important_style(getunit_el, "width", unit);
			set_important_style(getunit_el, "font-size", unit);
			//getunit_el.style.cssText = style;
			unitel.appendChild(getunit_el);
			// Get the client width of the test element
			var value = getunit_el.clientWidth;
			getunit_cache.set(unit, value, 5 * 60);
			if (extraBody) {
				// Remove the extra body element
				document.documentElement.removeChild(extraBody);
			} else {
				// Remove the test element
				unitel.removeChild(getunit_el);
			}
			// Return the em value in pixels
			return value;
		}
		function valid_source(source) {
			var thresh = 20;
			if (source.tagName !== "PICTURE" &&
				source.tagName !== "VIDEO" &&
				source.tagName !== "IMG" &&
				source.tagName !== "SOURCE") {
				var style = get_computed_style(source);
				if (style.getPropertyValue("background-image")) {
					var bgimg = style.getPropertyValue("background-image");
					if (!bgimg.match(/^(.*?\)\s*,)?\s*url[(]/)) {
						return false;
					}
				} else {
					return false;
				}
			}
			return !(source.width && source.width < thresh ||
				source.height && source.height < thresh);
		}
		var recalculate_rect = function(rect) {
			rect.left = rect.x;
			rect.top = rect.y;
			rect.right = rect.left + rect.width;
			rect.bottom = rect.top + rect.height;
			return rect;
		};
		var copy_rect = function(rect) {
			// simplified copy, need to use recalculate_rect after
			return {
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height
			};
		};
		var parse_zoom = function(zoom) {
			if (typeof zoom === "number")
				return zoom;
			var match = zoom.match(/^([-0-9.]+)%$/);
			if (match)
				return parseFloat(match[1]) / 100.;
			match = zoom.match(/^([-0-9.]+)$/);
			if (match) {
				return parseFloat(match[1]);
			}
			return null;
		};
		function get_bounding_client_rect_inner(el, mapcache, need_rect) {
			// test: https://4seasonstaeyeon.tumblr.com/post/190710743124 (bottom images)
			if (!el)
				return null;
			if (mapcache && mapcache.has(el)) {
				var value = mapcache.get(el);
				if (need_rect) {
					if (value.orig_rect)
						return value;
				} else {
					return value;
				}
			}
			var parent = {};
			var parentel = el.parentElement;
			if (parentel) {
				parent = get_bounding_client_rect_inner(parentel, mapcache, false);
			}
			var orig_rect = null;
			if (need_rect)
				orig_rect = el.getBoundingClientRect();
			var rect = null;
			var zoom = 1;
			//var computed_style = get_computed_style(el);
			// computed_style is slow, and also might not be what we're looking for, as it might contain the parent's zoom
			// this is still very slow though (50ms on facebook)
			// https://thisistian.github.io/publication/real-time-subsurface-with-adaptive-sampling/
			// math tags don't have style
			// TS removes the "zoom" property from CSSStyleDeclaration
			if ("style" in el && el.style.zoom) {
				zoom = parse_zoom(el.style.zoom);
				if (zoom && zoom !== 1) {
					if (!orig_rect)
						orig_rect = el.getBoundingClientRect();
					rect = copy_rect(orig_rect);
					rect.width *= zoom;
					rect.height *= zoom;
				}
			}
			if (parent.zoom && parent.zoom !== 1) {
				if (!orig_rect)
					orig_rect = el.getBoundingClientRect();
				if (!rect)
					rect = copy_rect(orig_rect);
				rect.x *= parent.zoom;
				rect.y *= parent.zoom;
				rect.width *= parent.zoom;
				rect.height *= parent.zoom;
				zoom *= parent.zoom;
				//console.log(el, zoom, deepcopy(rect));
			}
			// this is surprisingly slow, so rect is optimized out if possible
			if (false && parent.rect && parent.orig_rect) {
				if (!orig_rect)
					orig_rect = el.getBoundingClientRect();
				if (!rect)
					rect = copy_rect(orig_rect);
				rect.x += parent.rect.x - parent.orig_rect.x;
				rect.y += parent.rect.y - parent.orig_rect.y;
			}
			if (rect)
				recalculate_rect(rect);
			var result = {
				zoom: zoom
			};
			if (orig_rect)
				result.orig_rect = orig_rect;
			if (rect)
				result.rect = rect;
			if (mapcache) {
				mapcache.set(el, result);
			}
			return result;
		}
		function get_bounding_client_rect(el, mapcache) {
			var need_qsa_patch = false;
			// ublock origin patches getBoundingClientRect under youtube, calling document.querySelectorAll every time, which is very slow
			if (/youtube\.com$/.test(window.location.host))
				need_qsa_patch = true;
			var old_selectorall = null;
			if (need_qsa_patch) {
				old_selectorall = document.querySelectorAll;
				try {
					document.querySelectorAll = function() { return []; };
				} catch (e) { }
			}
			var obj = get_bounding_client_rect_inner(el, mapcache, true);
			if (need_qsa_patch) {
				try {
					document.querySelectorAll = old_selectorall;
				} catch (e) { }
			}
			return obj.rect || obj.orig_rect;
		}
		function get_popup_client_rect() {
			if (!popups || !popups[0])
				return null;
			var current_date = Date.now();
			if (!popup_client_rect_cache || (current_date - last_popup_client_rect_cache) > 50) {
				popup_client_rect_cache = get_bounding_client_rect(popups[0]);
				last_popup_client_rect_cache = current_date;
			}
			return popup_client_rect_cache;
		}
		;
		function get_popup_media_client_rect() {
			if (!popups || !popups[0])
				return null;
			var img = get_popup_media_el();
			if (!img)
				return null;
			var current_date = Date.now();
			if (!popup_media_client_rect_cache || (current_date - last_popup_media_client_rect_cache) > 30) {
				popup_media_client_rect_cache = img.getBoundingClientRect();
				last_popup_media_client_rect_cache = current_date;
			}
			return popup_media_client_rect_cache;
		}
		;
		function is_popup_el(el) {
			var current = el;
			do {
				if (array_indexof(popups, current) >= 0) {
					//console_error("Trying to find popup");
					return true;
				}
			} while ((current = current.parentElement));
			return false;
		}
		function find_source(els, options) {
			if (!options)
				options = {};
			if (!("links" in options))
				options.links = get_single_setting("mouseover_links");
			//console_log(els);
			var ok_els = [];
			var result = _find_source(els, ok_els, options);
			if (_nir_debug_) nir_debug("find_source", "find_source: result =", result, "ok_els =", ok_els);
			if (!result)
				return result;
			var ret_bad = function() {
				if (ok_els.length > 0)
					return ok_els[0];
				return null;
			};
			if (result.el) {
				if (is_popup_el(result.el)) {
					if (_nir_debug_) nir_debug("find_source", "find_source: result.el is popup el", result.el);
					return ret_bad();
				}
			}
			if (!result.is_ok_el && !result.src && (true || !is_valid_src(result.src, is_video_el(result.el)))) {
				if (_nir_debug_) nir_debug("find_source", "find_source: invalid src", result);
				return ret_bad();
			}
			var thresh = parse_int(get_tprofile_setting("mouseover_minimum_size"));
			// if it can be imu'd, ignore the treshold because the image could be any size
			if (isNaN(thresh) || result.imu)
				thresh = 0;
			var maxThresh = parse_int(get_tprofile_setting("popup_maximum_source_size"));
			if (isNaN(maxThresh))
				maxThresh = 0;
			if (!isNaN(result.width) && !isNaN(result.height) && result.width > 0 && result.height > 0) {
				if (result.width < thresh || result.height < thresh) {
					if (_nir_debug_) nir_debug("find_source", "find_source: result size is too small");
					return ret_bad();
				}
				if (maxThresh) {
					if (result.width > maxThresh || result.height > maxThresh) {
						console_log("Source media is too big to popup (user-configured maximum is", maxThresh, "px)");
						return null;
					}
				}
			}
			return result;
		}
		function _find_source(els, ok_els, options) {
			// resetpopups() is already called in trigger_popup()
			/*if (popups_active)
				return;*/
			if (_nir_debug_) nir_debug("find_source", "_find_source (els)", els);
			var sources = {};
			//var picture_sources = {};
			var links = {};
			var layers = [];
			var ok_els_set = new_set();
			var id = 0;
			var thresh = parse_int(get_tprofile_setting("mouseover_minimum_size"));
			if (isNaN(thresh))
				thresh = 0;
			var helpers = do_get_helpers({});
			var source;
			function check_visible(el) {
				var visible_valid = true;
				do {
					if (!el)
						break;
					var style = get_computed_style(el);
					if (!style)
						break;
					if (style.opacity.toString().match(/^0(?:\.0*)?$/) ||
						(visible_valid && style.visibility === "hidden")) {
						return false;
					}
					// https://www.msn.com/en-us/music/news/the-weeknd-calls-grammys-corrupt-slams-lack-of-transparency-after-nominations-shutout/ar-BB1bkAHH ("more for you" section)
					// a higher element has visibility: hidden, but a lower one has visibility: visible
					if (visible_valid && style.visibility === "visible") {
						visible_valid = false;
					}
				} while (el = el.parentElement);
				return true;
			}
			function getsource() {
				var thesource = null;
				var first = false;
				for (var source in sources) {
					if (first)
						return;
					first = true;
					thesource = sources[source];
				}
				return thesource;
			}
			function getfirstsource(sources) {
				var smallestid = MAX_SAFE_INTEGER;
				var thesource = null;
				for (var source_url in sources) {
					var source = sources[source_url];
					if (source.id < smallestid) {
						smallestid = source.id;
						thesource = sources[source_url];
					}
				}
				return thesource;
			}
			function norm(src) {
				return urljoin(window.location.href, src, true);
			}
			function imu_check(src, el) {
				var result = bigimage_recursive(src, {
					fill_object: true,
					use_cache: "read",
					do_request: null,
					document: document,
					window: get_window(),
					host_url: window.location.href,
					element: el,
					include_pastobjs: true,
					iterations: 2,
					cb: null
				});
				var newurl = src;
				for (var i = 0; i < result.length; i++) {
					if (result[i].url !== src) {
						if (newurl === src)
							newurl = result[i].url;
						continue;
					}
					if (result[i].bad)
						return false;
					// if result.length > 1, then it can be imu'd
					if (result.length > 1) {
						return newurl || true;
					} else {
						return void 0;
					}
				}
				return newurl || true;
			}
			function addImage(src, el, options) {
				if (_nir_debug_) nir_debug("find_source", "_find_source (addImage)", src, el, check_visible(el), options);
				if (!is_valid_resource_url(src))
					return false;
				if (src && settings.mouseover_apply_blacklist && !bigimage_filter(src)) {
					if (_nir_debug_) nir_debug("find_source", "blacklisted");
					return false;
				}
				if (!(src in sources)) {
					sources[src] = {
						count: 0,
						src: src,
						el: el,
						id: id++,
					};
				}
				// blank images
				// https://www.harpersbazaar.com/celebrity/red-carpet-dresses/g7565/selena-gomez-style-transformation/?slide=2
				var el_style = null;
				if (el) {
					el_style = window.getComputedStyle(el) || el.style;
				}
				if (!options) {
					options = {};
				}
				if (options.isbg && get_tprofile_setting("mouseover_exclude_backgroundimages")) {
					return false;
				}
				var imucheck = imu_check(src, el);
				if (imucheck === false) {
					if (_nir_debug_) nir_debug("find_source", "Bad image", el);
					return false;
				}
				if (!("imu" in sources[src])) {
					sources[src].imu = !!imucheck;
				}
				if (imucheck === true) {
					// do this after imu_check, for lazy loaded images that have 1x1 images
					if (src && (src.match(/^data:/) && !(/^data:image\/svg\+xml;/.test(src)) && src.length <= 500)) {
						if (_nir_debug_) nir_debug("find_source", "Tiny data: image", el, src);
						return false;
					}
				}
				// https://www.smugmug.com/
				// https://www.vogue.com/article/lady-gaga-met-gala-2019-entrance-behind-the-scenes-video
				// https://www.pinterest.com/
				if (!check_visible(el)) {
					if (_nir_debug_) nir_debug("find_source", "Invisible: image", el);
					return false;
				}
				if (settings.mouseover_only_links) {
					if (!el)
						return false;
					var has_link = false;
					var current = el;
					do {
						if (get_tagname(current) === "A") {
							has_link = true;
							break;
						}
					} while (current = current.parentElement);
					if (!has_link)
						return false;
				}
				if ("layer" in options) {
					if (!(options.layer in layers)) {
						layers[options.layer] = [];
					}
					layers[options.layer].push(src);
				}
				sources[src].count++;
				return true;
			}
			function addTagElement(el, layer) {
				//nir_debug("find_source", "addTagElement", el);
				if (helpers && helpers.element_replace) {
					var newel = helpers.element_replace(el);
					if (newel)
						el = newel;
				}
				if (helpers && helpers.element_ok) {
					if (!set_has(ok_els_set, el)) {
						var element_ok_result = helpers.element_ok(el);
						var ok_el_obj = {
							count: 1,
							src: null,
							el: el,
							id: id++,
							is_ok_el: true
						};
						if (element_ok_result === true) {
							ok_els.push(ok_el_obj);
							set_add(ok_els_set, el);
						} else {
							if (is_element(element_ok_result)) {
								ok_el_obj.el = element_ok_result;
								ok_els.push(ok_el_obj);
								set_add(ok_els_set, el);
								el = element_ok_result;
							}
						}
					}
				}
				var el_tagname = get_tagname(el);
				if (el_tagname === "PICTURE" || el_tagname === "VIDEO") {
					for (var i = 0; i < el.children.length; i++) {
						addElement(el.children[i], layer);
					}
				}
				if (el_tagname === "SOURCE" || el_tagname === "IMG" || el_tagname === "IMAGE" || el_tagname === "VIDEO" ||
					(settings.mouseover_allow_canvas_el && el_tagname === "CANVAS") ||
					(settings.mouseover_allow_svg_el && el_tagname === "SVG")) {
					if (settings.mouseover_exclude_imagemaps && el_tagname === "IMG" && el.hasAttribute("usemap")) {
						var mapel = document.querySelector("map[name=\"" + el.getAttribute("usemap").replace(/^#/, "") + "\"]");
						if (mapel) {
							if (_nir_debug_) nir_debug("find_source", "_find_source skipping", el, "due to image map", mapel);
							return;
						}
					}
					var el_src = get_img_src(el);
					if (el_src) {
						var src = norm(el_src);
						addImage(src, el, { layer: layer });
						if (!el.srcset && src in sources) {
							var dimensions = get_el_dimensions(el);
							sources[src].width = dimensions[0];
							sources[src].height = dimensions[1];
						}
					}
					if (!el.srcset)
						return;
					var ssources = [];
					var srcset = el.srcset;
					// https://www.erinyamagata.com/art-direction/kiernan-shipka
					// https://format-com-cld-res.cloudinary.com/image/private/s--hNRUHHWH--/c_crop,h_1596,w_1249,x_0,y_0/c_fill,g_center,w_2500/fl_keep_iptc.progressive,q_95/v1/986aaf7dd74bd5041ddfc495c430bf0d/KShipkaR29MW_FULL_3468.jpg?2500 2500w 3194h, https://format-com-cld-res.cloudinary.com/image/private/s--VSup0NR3--/c_crop,h_1596,w_1249,x_0,y_0/c_fill,g_center,w_900/fl_keep_iptc.progressive,q_95/v1/986aaf7dd74bd5041ddfc495c430bf0d/KShipkaR29MW_FULL_3468.jpg?900 900w 1150h
					// newlines: https://www.rt.com/russia/447357-miss-moscow-2018-photos/
					//
					// https://cdni.rt.com/files/2018.12/xxs/5c221e1ffc7e9397018b4600.jpg 280w,
					// https://cdni.rt.com/files/2018.12/xs/5c221e1ffc7e9397018b4601.jpg 320w,
					// https://cdni.rt.com/files/2018.12/thumbnail/5c221e1ffc7e9397018b45ff.jpg 460w,
					// https://cdni.rt.com/files/2018.12/m/5c221e1ffc7e9397018b4602.jpg 540w,
					// https://cdni.rt.com/files/2018.12/l/5c221e1ffc7e9397018b4603.jpg 768w,
					// https://cdni.rt.com/files/2018.12/article/5c221e1ffc7e9397018b45fe.jpg 980w,
					// https://cdni.rt.com/files/2018.12/xxl/5c221e20fc7e9397018b4604.jpg 1240w
					while (srcset.length > 0) {
						var old_srcset = srcset;
						srcset = srcset.replace(/^\s+/, "");
						// reference: https://html.spec.whatwg.org/multipage/images.html#srcset-attribute
						// https://mindbodygreen-res.cloudinary.com/image/upload/c_fill,g_auto,w_70,h_70,q_auto,f_auto,fl_lossy/usr/RhDUPFE.jpg, https://mindbodygreen-res.cloudinary.com/image/upload/c_fill,g_auto,w_70,h_70,q_auto,f_auto,fl_lossy/dpr_2.0/usr/RhDUPFE.jpg 2x
						var match = srcset.match(/^(\S+)(?:,\s+.*)?$/);
						if (!match)
							match = srcset.match(/^(\S+(?:\s+[^,]+)?)(?:,[\s\S]*)?\s*$/);
						if (match) {
							ssources.push(match[1].replace(/\s*$/, ""));
							srcset = srcset.substr(match[1].length);
						}
						srcset = srcset.replace(/^\s*,/, "");
						if (srcset === old_srcset)
							break;
					}
					//var ssources = el.srcset.split(/ +[^ ,/],/);
					var sizes = [];
					if (el.sizes) {
						sizes = el.sizes.split(",");
					}
					// https://www.gamestar.de/artikel/red-dead-redemption-2-pc-vorabversion-mit-limit-bei-120-fps-directx-12-und-vulkan,3350718.html
					// sidebar articles: //8images.cgames.de/images/gamestar/256/red-dead-redemption-2_6062507.jpg, //8images.cgames.de/images/gamestar/210/red-dead-redemption-2_6062507.jpg 2x
					for (var i = 0; i < ssources.length; i++) {
						var src = norm(ssources[i].replace(/^(\S+)(?:\s+[\s\S]+)?\s*$/, "$1"));
						var desc = ssources[i].slice(src.length).replace(/^\s*([\s\S]*?)\s*$/, "$1");
						if (!addImage(src, el, { layer: layer }))
							continue;
						//picture_sources[src] = sources[src];
						sources[src].picture = el.parentElement;
						if (desc) {
							sources[src].desc = desc;
							// https://format-com-cld-res.cloudinary.com/image/pr…dc82/004_003_03-000083520001.jpg?2500 2500w 1831h
							while (desc.length > 0) {
								desc = desc.replace(/^\s+/, "");
								var whxmatch = desc.match(/^([0-9.]+)([whx])(?:\s+[0-9.]+[\s\S]*)?\s*$/);
								if (whxmatch) {
									var number = parseFloat(whxmatch[1]);
									if (number > 0) {
										// if width/height/desc_x > number, then number is probably more accurate (multiple els, see rt link above)
										if (whxmatch[2] === "w" && (!sources[src].width || sources[src].width > number))
											sources[src].width = number;
										else if (whxmatch[2] === "h" && (!sources[src].height || sources[src].height > number))
											sources[src].height = number;
										else if (whxmatch[2] === "x" && (!sources[src].desc_x || sources[src].desc_x > number))
											sources[src].desc_x = number;
									}
									desc = desc.substr(whxmatch[1].length + whxmatch[2].length);
								} else {
									break;
								}
							}
						}
						if (el.media) {
							sources[src].media = el.media;
							if (el.media.match(/min-width:\s*([0-9]+)/)) {
								//picture_minw = true;
								var minWidth = getUnit(el.media.replace(/.*min-width:\s*([0-9.a-z]+).*/, "$1"));
								if (!sources[src].minWidth || sources[src].minWidth > minWidth)
									sources[src].minWidth = minWidth;
							}
							if (el.media.match(/max-width:\s*([0-9]+)/)) {
								//picture_maxw = true;
								var maxWidth = getUnit(el.media.replace(/.*max-width:\s*([0-9.a-z]+).*/, "$1"));
								if (!sources[src].maxWidth || sources[src].maxWidth > maxWidth)
									sources[src].maxWidth = maxWidth;
							}
							if (el.media.match(/min-height:\s*([0-9]+)/)) {
								//picture_minh = true;
								var minHeight = getUnit(el.media.replace(/.*min-height:\s*([0-9.a-z]+).*/, "$1"));
								if (!sources[src].minHeight || sources[src].minHeight > minHeight)
									sources[src].minHeight = minHeight;
							}
							if (el.media.match(/max-height:\s*([0-9]+)/)) {
								//picture_maxh = true;
								var maxHeight = getUnit(el.media.replace(/.*max-height:\s*([0-9.a-z]+).*/, "$1"));
								if (!sources[src].maxHeight || sources[src].maxHeight > maxHeight)
									sources[src].maxHeight = maxHeight;
							}
						}
					}
				}
				if (el_tagname === "A" || (settings.mouseover_allow_iframe_el && el_tagname === "IFRAME")) {
					var src_4 = get_img_src(el);
					links[src_4] = {
						count: 1,
						src: src_4,
						el: el,
						id: id++
					};
				}
			}
			function _tokenize_css_value(str) {
				var tokensets = [];
				var tokens = [];
				var current_token = "";
				var quote = null;
				var escaping = false;
				for (var i = 0; i < str.length; i++) {
					var char = str[i];
					if (escaping) {
						current_token += char;
						escaping = false;
						continue;
					}
					if (quote) {
						if (char === quote) {
							quote = null;
							tokens.push(current_token);
							current_token = "";
						} else {
							current_token += char;
						}
						continue;
					}
					if (/\s/.test(char)) {
						if (current_token.length > 0) {
							tokens.push(current_token);
							current_token = "";
						}
						continue;
					} else if (char === '\\') {
						escaping = true;
						continue;
					} else if (char === '"' || char === "'") {
						quote = char;
						continue;
					} else if (char === '(') {
						var subtokens = _tokenize_css_value(str.substr(i + 1));
						tokens.push({ name: current_token, tokens: subtokens[0] });
						i += subtokens[1];
						current_token = "";
						continue;
					} else if (char === ')') {
						i++;
						break;
					} else if (char === ',') {
						if (current_token)
							tokens.push(current_token);
						tokensets.push(tokens);
						tokens = [];
						current_token = "";
						continue;
					}
					current_token += char;
				}
				if (current_token)
					tokens.push(current_token);
				if (tokens)
					tokensets.push(tokens);
				return [tokensets, i];
			}
			function has_bgimage_url(tokenized) {
				for (var i = 0; i < tokenized.length; i++) {
					if (tokenized[i].length < 1)
						continue;
					if (typeof tokenized[i][0] !== "object")
						continue;
					var our_func = tokenized[i][0];
					var funcname = our_func.name;
					// TODO: support image() and cross-fade()
					var allowed = [
						"url",
						"-webkit-image-set",
						"image-set"
					];
					if (array_indexof(allowed, funcname) < 0)
						continue;
					if (funcname === "url") {
						if (our_func.tokens.length >= 1 && our_func.tokens[0].length > 0 && our_func.tokens[0][0].length > 0)
							return true;
					} else {
						if (has_bgimage_url(our_func.tokens))
							return true;
					}
				}
				return false;
			}
			function get_urlfunc_url(func) {
				if (typeof func !== "object")
					return null;
				if (func.name !== "url")
					return null;
				if (func.tokens.length < 1 || func.tokens[0].length < 1 || func.tokens[0][0].length === 0)
					return null;
				return func.tokens[0][0];
			}
			function get_imageset_urls(func) {
				var urls = [];
				for (var i = 0; i < func.tokens.length; i++) {
					if (func.tokens[i].length < 1) {
						continue;
					}
					var url = get_urlfunc_url(func.tokens[i][0]);
					if (!url)
						continue;
					var source = {
						src: url
					};
					for (var j = 1; j < func.tokens[i].length; j++) {
						var desc = func.tokens[i][j];
						var whxmatch = desc.match(/^([0-9.]+)(x|dp(?:px|i|cm))$/);
						if (whxmatch) {
							var number = parseFloat(whxmatch[1]);
							if (number > 0) {
								var unit = whxmatch[2];
								// https://drafts.csswg.org/css-values-3/#cm
								if (unit === "dppx") {
									number *= 96;
									unit = "dpi";
								} else if (unit === "dpcm") {
									number *= 96 / 2.54;
									unit = "dpi";
								}
								if (unit === "x")
									source.desc_x = number;
								else if (unit === "dpi")
									source.dpi = number;
							}
						} else {
							console_warn("Unknown descriptor: " + desc);
						}
					}
					urls.push(source);
				}
				return urls;
			}
			function get_bgimage_urls(tokenized) {
				var urls = [];
				for (var i = 0; i < tokenized.length; i++) {
					if (tokenized[i].length < 1)
						continue;
					if (typeof tokenized[i][0] !== "object")
						continue;
					var our_func = tokenized[i][0];
					var funcname = our_func.name;
					// TODO: support image() and cross-fade()
					var allowed = [
						"url",
						"-webkit-image-set",
						"image-set"
					];
					if (array_indexof(allowed, funcname) < 0)
						continue;
					if (funcname === "url") {
						var url = get_urlfunc_url(our_func);
						if (url) {
							urls.push(url);
						}
					} else if (funcname === "-webkit-image-set" || funcname === "image-set") {
						var newurls = get_imageset_urls(our_func);
						if (newurls) {
							array_extend(urls, newurls);
						}
					}
				}
				return urls;
			}
			function get_urls_from_css(str, elstr) {
				var str_tokenized = _tokenize_css_value(str)[0];
				if (!has_bgimage_url(str_tokenized))
					return null;
				// -webkit-image-set(url('https://carbonmade-media.accelerator.net/34754698;460x194/lossless.webp') 1x, url('https://carbonmade-media.accelerator.net/34754698;920x388/lossless.webp') 2x)
				//var emptystrregex = /^(.*?\)\s*,)?\s*url[(]["']{2}[)]/;
				//if (!str.match(/^(.*?\)\s*,)?\s*url[(]/) || emptystrregex.test(str))
				//	return null;
				// window.getComputedStyle returns the window's URL in this case for some reason, so we need the element's style to find the empty string
				var elstr_tokenized;
				if (elstr) {
					elstr_tokenized = _tokenize_css_value(elstr)[0];
					if (!has_bgimage_url(elstr_tokenized))
						return null;
				}
				return get_bgimage_urls(str_tokenized);
			}
			function add_urls_from_css(el, str, elstr, layer, bg) {
				var urls = get_urls_from_css(str, elstr);
				if (urls) {
					var url;
					for (var i = 0; i < urls.length; i++) {
						url = urls[i];
						if (typeof url !== "string") {
							url = url.src;
						}
						addImage(url, el, {
							isbg: bg,
							layer: layer
						});
						if (typeof urls[i] !== "string") {
							var props = ["desc_x", "dpi"];
							for (var j = 0; j < props.length; j++) {
								var prop = props[j];
								if (urls[i][prop] && (!sources[url][prop] || sources[url][prop] > urls[i][prop])) {
									sources[url][prop] = urls[i][prop];
								}
							}
						}
					}
				}
			}
			function add_bgimage(layer, el, style, beforeafter) {
				if (!style || !("style" in el))
					return;
				if (style.getPropertyValue("background-image")) {
					var bgimg = style.getPropertyValue("background-image");
					add_urls_from_css(el, bgimg, el.style.getPropertyValue("background-image"), layer, beforeafter || true);
				}
				if (beforeafter) {
					if (style.getPropertyValue("content")) {
						add_urls_from_css(el, style.getPropertyValue("content"), void 0, layer, beforeafter);
					}
				}
			}
			function addElement(el, layer) {
				if (_nir_debug_) nir_debug("find_source", "_find_source (addElement)", el, layer);
				if (get_tprofile_setting("mouseover_exclude_page_bg") && el.tagName === "BODY") {
					return;
				}
				if (typeof layer === "undefined")
					layer = layers.length;
				addTagElement(el, layer);
				add_bgimage(layer, el, window.getComputedStyle(el));
				add_bgimage(layer, el, window.getComputedStyle(el, ":before"), "before");
				add_bgimage(layer, el, window.getComputedStyle(el, ":after"), "after");
			}
			for (var i = 0; i < els.length; i++) {
				// sidebar articles on https://www.rt.com/russia/447357-miss-moscow-2018-photos/
				// the <picture> element has a size of 0, and hence isn't added to find_els_at_point
				if (els[i].tagName === "IMG" && els[i].parentElement && els[i].parentElement.tagName === "PICTURE" && array_indexof(els, els[i].parentElement) < 0) {
					els.splice(i + 1, 0, els[i].parentElement);
				}
				// remove every element before PICTURE as they will be added automatically anyways
				// this messes up the layering
				if (els[i].tagName === "PICTURE" && i == 1) {
					els.splice(0, i);
					i = 0;
					break;
				}
			}
			for (var i = 0; i < els.length; i++) {
				var el = els[i];
				addElement(el);
			}
			if (_nir_debug_) {
				//console_log(els);
				if (_nir_debug_) nir_debug("find_source", "_find_source (sources)", deepcopy(sources));
				if (_nir_debug_) nir_debug("find_source", "_find_source (layers)", deepcopy(layers));
				if (_nir_debug_) nir_debug("find_source", "_find_source (ok_els)", deepcopy(ok_els));
			}
			// remove sources that aren't used
			var activesources = [];
			for (var i = 0; i < layers.length; i++) {
				for (var j = 0; j < layers[i].length; j++) {
					if (array_indexof(activesources, layers[i][j]) < 0)
						activesources.push(layers[i][j]);
				}
			}
			var ok_els_sources = [];
			for (var source_1 in sources) {
				for (var i = 0; i < ok_els.length; i++) {
					if (sources[source_1].el === ok_els[i].el) {
						ok_els[i] = sources[source_1];
						ok_els_sources[i] = true;
					}
				}
				if (array_indexof(activesources, source_1) < 0)
					delete sources[source_1];
			}
			for (var i = 0; i < ok_els.length; i++) {
				if (!ok_els_sources[i] && !ok_els[i].src) {
					addElement(ok_els[i].el);
				}
			}
			if ((source = getsource()) !== void 0) {
				if (_nir_debug_) nir_debug("find_source", "_find_source (getsource())", source);
				if (source === null) {
					if (ok_els.length > 0) {
						return ok_els[0];
					} else if (options.links) {
						if (Object.keys(links).length > 0) {
							var our_key = null;
							for (var link in links) {
								if (!settings.mouseover_only_valid_links) {
									our_key = link;
									break;
								}
								if (looks_like_valid_link(link, links[link].el)) {
									our_key = link;
									break;
								}
							}
							if (our_key)
								return links[our_key];
						}
					}
				}
				return source;
			}
			for (var i = 0; i < layers.length; i++) {
				var minW = 0;
				var elW = null;
				var minH = 0;
				var elH = null;
				var minMinW = 0;
				var elMinW = null;
				var minMinH = 0;
				var elMinH = null;
				var minMaxW = 0;
				var elMaxW = null;
				var minMaxH = 0;
				var elMaxH = null;
				var minX = 0;
				var elX = null;
				var minDpi = 0;
				var elDpi = null;
				var okurls = {};
				var have_something = false;
				for (var j = 0; j < layers[i].length; j++) {
					var source_url = layers[i][j];
					var source = sources[source_url];
					if (source.width && source.width > minW) {
						minW = source.width;
						elW = source;
						have_something = true;
					}
					if (source.height && source.height > minH) {
						minH = source.height;
						elH = source;
						have_something = true;
					}
					if (source.minWidth && source.minWidth > minMinW) {
						minMinW = source.minWidth;
						elMinW = source;
						have_something = true;
					}
					if (source.minHeight && source.minHeight > minMinH) {
						minMinH = source.minHeight;
						elMinH = source;
						have_something = true;
					}
					if (source.maxWidth && source.maxWidth > minMaxW) {
						minMaxW = source.maxWidth;
						elMaxW = source;
					}
					if (source.maxHeight && source.maxHeight > minMaxH) {
						minMaxH = source.maxHeight;
						elMaxH = source;
					}
					if (source.desc_x && source.desc_x > minX) {
						minX = source.desc_x;
						elX = source;
						have_something = true;
					}
					if (source.dpi && source.dpi > minDpi) {
						//dpiX = source.dpi; // commenting out because dpiX doesn't exist
						elDpi = source;
						have_something = true;
					}
					if (source.isbg) {
						okurls[source.src] = true;
						have_something = true;
					}
				}
				if (!have_something)
					continue;
				if (minX > 1) {
					okurls[elX.src] = true;
				}
				if (minDpi > 96) {
					okurls[elDpi.src] = true;
				}
				if (minW > thresh && minW > minMinW) {
					okurls[elW.src] = true;
				}
				if (minH > thresh && minH > minMinH) {
					okurls[elH.src] = true;
				}
				if (minMinW > thresh && minMinW >= minW) {
					okurls[elMinW.src] = true;
				}
				if (minMinH > thresh && minMinH >= minH) {
					okurls[elMinH.src] = true;
				}
				layers[i] = [];
				for (var url in okurls) {
					layers[i].push(url);
				}
			}
			// TODO: improve?
			function pickbest(layer) {
				for (var i = 0; i < layer.length; i++) {
					var source_url = layer[i];
					var source = sources[source_url];
					if (source.desc_x)
						return source;
				}
				return sources[layer[0]];
			}
			function rebuildlayers() {
				var newlayers = [];
				for (var i = 0; i < layers.length; i++) {
					if (layers[i].length === 0)
						continue;
					newlayers.push(layers[i]);
				}
				layers = newlayers;
			}
			if (_nir_debug_) nir_debug("find_source", "_find_source (new layers)", deepcopy(layers));
			rebuildlayers();
			if (_nir_debug_) nir_debug("find_source", "_find_source (rebuilt layers)", deepcopy(layers));
			// If there are background images ahead of an image, it's likely to be masks
			// Maybe check if there's more than one element of ancestry between them?
			// Except: https://www.flickr.com/account/upgrade/pro (featured pro, the avatar's image is a bg image, while the image behind isn't)
			if (layers.length > 1 && layers[0].length === 1 && sources[layers[0][0]].isbg) {
				for (var i = 1; i < layers.length; i++) {
					if (layers[i].length === 1 && sources[layers[i][0]].isbg)
						continue;
					return pickbest(layers[i]);
				}
			}
			if (layers.length > 0) {
				return pickbest(layers[0]);
			}
			if (source = getsource())
				return source;
			else
				return getfirstsource(sources);
		}
		var get_next_in_gallery_generic = function(el, nextprev) {
			if (!el)
				return null;
			// https://www.gog.com/game/shadow_warrior_complete
			// "Buy series" gallery
			if (array_indexof(["SOURCE", "IMG"], el.tagName) >= 0 && el.parentElement && array_indexof(["PICTURE", "VIDEO"], el.parentElement.tagName) >= 0) {
				el = el.parentElement;
			}
			var stack = [el.tagName];
			var current_el = el;
			var firstchild = false;
			while (true) {
				if (!firstchild) {
					var next = current_el.nextElementSibling;
					if (!nextprev)
						next = current_el.previousElementSibling;
					if (!next) {
						current_el = current_el.parentElement;
						if (!current_el)
							break;
						stack.unshift(current_el.tagName);
						continue;
					}
					current_el = next;
				} else {
					firstchild = false;
				}
				if (current_el.tagName === stack[0]) {
					if (stack.length === 1) {
						//if (valid_source(current_el))
						if (is_valid_el(current_el))
							return current_el;
						continue;
					}
					if (nextprev) {
						for (var i = 0; i < current_el.children.length; i++) {
							if (current_el.children[i].tagName === stack[1]) {
								current_el = current_el.children[i];
								stack.shift();
								firstchild = true;
								break;
							}
						}
					} else {
						for (var i = current_el.children.length - 1; i >= 0; i--) {
							if (current_el.children[i].tagName === stack[1]) {
								current_el = current_el.children[i];
								stack.shift();
								firstchild = true;
								break;
							}
						}
					}
				}
			}
			return null;
		};
		get_next_in_gallery = function(el, nextprev) {
			if (override_album) {
				var index = array_indexof(override_album, el);
				if (index < 0)
					return null;
				if (nextprev) {
					index++;
				} else {
					index--;
				}
				if (index < 0)
					return null;
				if (index >= override_album.length)
					return null;
				return override_album[index];
			}
			var value = get_album_info_gallery(popup_obj, el, nextprev);
			if (value || value === false)
				return value;
			if (!el.parentElement) {
				if (el.hasAttribute("imu-album-info")) {
					el = popup_orig_el;
				}
			}
			// FIXME: this is a rather bad hack to fix https://github.com/qsniyg/maxurl/issues/467
			previous_album_links = [];
			// FIXME: disabling because get_next_in_gallery can be called multiple times, just for checking links, not for actually redirecting
			if (false && popup_obj && popup_obj.album_info && popup_obj.album_info.type === "links") {
				array_foreach(popup_obj.album_info.links, function(link) {
					previous_album_links.push(link.url);
				});
			}
			return get_next_in_gallery_generic(el, nextprev);
		};
		/*function normalize_trigger() {
			if (!is_array(settings.mouseover_trigger)) {
				settings.mouseover_trigger = [settings.mouseover_trigger];
			}
		}

		normalize_trigger();*/
		function update_mouseover_trigger_delay() {
			delay = settings.mouseover_trigger_delay;
			if (delay < 0 || isNaN(delay))
				delay = false;
			if (typeof delay === "number" && delay >= 10)
				delay = 10;
			if (get_single_setting("mouseover_trigger_behavior") === "mouse") {
				delay_mouseonly = true;
			} else {
				delay = false;
				delay_mouseonly = false;
			}
			if (delay_handle) {
				clearTimeout(delay_handle);
				delay_handle = null;
			}
		}
		update_mouseover_trigger_delay();
		settings_meta.mouseover_trigger_delay.onupdate = update_mouseover_trigger_delay;
		settings_meta.mouseover_trigger_behavior.onupdate = update_mouseover_trigger_delay;
		function can_add_to_chord(str) {
			if (!keystr_is_wheel(str))
				return true;
			return !chord_is_only_wheel(current_chord);
		}
		function clear_chord_wheel() {
			for (var i = 0; i < current_chord.length; i++) {
				if (keystr_is_wheel(current_chord[i])) {
					current_chord.splice(i, 1);
					i--;
				}
			}
		}
		function clear_chord() {
			current_chord = [];
			current_chord_timeout = {};
		}
		function clear_chord_if_only_wheel() {
			if (chord_is_only_wheel(current_chord))
				clear_chord();
		}
		function keystr_in_trigger(str, wanted_chord) {
			return array_indexof(wanted_chord, str) >= 0;
		}
		function key_would_modify_single_chord(str, value) {
			if (value) {
				if (!can_add_to_chord(str))
					return false;
				if (array_indexof(current_chord, str) < 0)
					return true;
			} else {
				if (array_indexof(current_chord, str) >= 0)
					return true;
			}
			return false;
		}
		function set_chord_sub(str, value) {
			if (value) {
				if (!can_add_to_chord(str))
					return false;
				current_chord_timeout[str] = Date.now();
				if (array_indexof(current_chord, str) < 0) {
					current_chord.push(str);
					//console_log("+" + str);
					return true;
				}
			} else {
				delete current_chord_timeout[str];
				if (array_indexof(current_chord, str) >= 0) {
					current_chord.splice(array_indexof(current_chord, str), 1);
					clear_chord_if_only_wheel();
					//console_log("-" + str);
					return true;
				}
			}
			return false;
		}
		function event_in_single_chord(e, wanted_chord) {
			var map = get_keystrs_map(e, true);
			for (var key in map) {
				// otherwise, modifiers like ctrl etc. get counted, even if they're not pressed (because get_keystrs_map reports them as false)
				// todo: if this function is ever called in keyup, another solution is needed.
				// for now, it'll only ever be called on keydown
				if (!map[key])
					continue;
				if (keystr_in_trigger(key, wanted_chord))
					return true;
			}
			return false;
		}
		function event_in_chord(e, wanted_chord) {
			wanted_chord = normalize_keychord(wanted_chord);
			for (var i = 0; i < wanted_chord.length; i++) {
				if (event_in_single_chord(e, wanted_chord[i]))
					return true;
			}
			return false;
		}
		function remove_old_keys() {
			var now = Date.now();
			for (var key in current_chord_timeout) {
				if (now - current_chord_timeout[key] > 5000)
					set_chord_sub(key, false);
			}
		}
		function update_chord(e, value) {
			var map = get_keystrs_map(e, value);
			remove_old_keys();
			var changed = false;
			for (var key in map) {
				if (set_chord_sub(key, map[key]))
					changed = true;
			}
			return changed;
		}
		function event_would_modify_single_chord(e, value, wanted_chord) {
			var map = get_keystrs_map(e, value);
			for (var key in map) {
				if (wanted_chord !== void 0 && !keystr_in_trigger(key, wanted_chord))
					continue;
				if (key_would_modify_single_chord(key, map[key]))
					return true;
			}
			return false;
		}
		function event_would_modify_chord(e, value, wanted_chord) {
			wanted_chord = normalize_keychord(wanted_chord);
			for (var i = 0; i < wanted_chord.length; i++) {
				if (event_would_modify_single_chord(e, value, wanted_chord[i]))
					return true;
			}
			return false;
		}
		function trigger_complete_single(wanted_chord) {
			for (var i = 0; i < wanted_chord.length; i++) {
				var key = wanted_chord[i];
				if (array_indexof(current_chord, key) < 0)
					return false;
			}
			// e.g. if the user presses shift+r, but the chord is r, then it should fail
			for (var i = 0; i < current_chord.length; i++) {
				if (keystr_is_wheel(current_chord[i]))
					continue;
				if (array_indexof(wanted_chord, current_chord[i]) < 0)
					return false;
			}
			return true;
		}
		function trigger_complete(wanted_chord) {
			wanted_chord = normalize_keychord(wanted_chord);
			for (var i = 0; i < wanted_chord.length; i++) {
				if (trigger_complete_single(wanted_chord[i]))
					return true;
			}
			return false;
		}
		function trigger_partially_complete_single(e, wanted_chord) {
			for (var i = 0; i < wanted_chord.length; i++) {
				var key = wanted_chord[i];
				if (array_indexof(current_chord, key) >= 0)
					return true;
			}
			return false;
		}
		function trigger_partially_complete(e, wanted_chord) {
			wanted_chord = normalize_keychord(wanted_chord);
			for (var i = 0; i < wanted_chord.length; i++) {
				if (trigger_partially_complete_single(e, wanted_chord[i]))
					return true;
			}
			return false;
		}
		function get_close_behavior() {
			return get_single_setting("mouseover_close_behavior");
		}
		function get_close_need_mouseout() {
			return settings.mouseover_close_need_mouseout && get_close_behavior() !== "esc";
		}
		// commenting out because it's unused and close_on_leave_el no longer exists
		/*function get_close_on_leave_el() {
			return settings.mouseover_close_on_leave_el && get_single_setting("mouseover_position") === "beside_cursor";
		}*/
		function should_exclude_imagetab() {
			return settings.mouseover_exclude_imagetab && get_single_setting("mouseover_trigger_behavior") === "mouse" &&
				currenttab_is_image() && !imagetab_ok_override;
		}
		var exclude_find_els = new_set();
		function find_els_at_point(xy, els, prev, zoom_cache) {
			// test for pointer-events: none: https://www.shacknews.com/article/114834/should-you-choose-vulkan-or-directx-12-in-red-dead-redemption-2
			if (false && _nir_debug_)
				console_log("find_els_at_point", deepcopy(xy), deepcopy(els), deepcopy(prev));
			var first_run = false;
			if (!prev) {
				prev = new_set();
				first_run = true;
			}
			if (zoom_cache === void 0) {
				try {
					zoom_cache = new Map();
				} catch (e) {
					zoom_cache = null;
				}
			}
			var ret = [];
			var afterret = [];
			var els_mode = get_single_setting("mouseover_find_els_mode");
			if (!els) {
				var orig_els = document.elementsFromPoint(xy[0], xy[1]);
				els = [];
				for (var _i = 0, orig_els_1 = orig_els; _i < orig_els_1.length; _i++) {
					var el_2 = orig_els_1[_i];
					if (!set_has(exclude_find_els, el_2))
						els.push(el_2);
				}
				afterret = els;
				if (_nir_debug_) {
					console_log("find_els_at_point (elsfrompoint)", deepcopy(els));
				}
				if (els_mode === "simple")
					return els;
			}
			for (var i = 0; i < els.length; i++) {
				if (i > 0 && first_run && els_mode === "hybrid") {
					ret.push(els[i]);
					continue;
				}
				var el = els[i];
				if (set_has(prev, el))
					continue;
				set_add(prev, el);
				var el_has_children = false;
				var el_children = null;
				var el_shadow_children = null;
				if (el.childElementCount > 0) {
					el_children = el.children;
					el_has_children = true;
				}
				if (el.shadowRoot && el.shadowRoot.childElementCount > 0) {
					el_shadow_children = el.shadowRoot.children;
					el_has_children = true;
				}
				// FIXME: should we stop checking if not in bounding client rect?
				// this would depend on the fact that children are always within the bounding rect
				//  - probably not, there are cases where the parent div has a size of 0, but children have proper sizes
				if (el_has_children) {
					// reverse, because the last element is (usually) the highest z
					var newchildren = [];
					if (el_children) {
						for (var j = el_children.length - 1; j >= 0; j--) {
							newchildren.push(el_children[j]);
						}
					}
					// shadow is above non-shadow?
					if (el_shadow_children) {
						for (var j = el_shadow_children.length - 1; j >= 0; j--) {
							newchildren.push(el_shadow_children[j]);
						}
					}
					var newels = find_els_at_point(xy, newchildren, prev, zoom_cache);
					for (var j = 0; j < newels.length; j++) {
						var newel = newels[j];
						//console_log("about to add", newel, deepcopy(ret))
						if (array_indexof(ret, newel) < 0) {
							//console_log("adding", newel);
							ret.push(newel);
						}
					}
				}
				// youtube links on: https://old.reddit.com/r/anime/comments/btlmky/wt_mushishi_a_beautifully_melancholic_take_on_the/
				// they pop up outside of the cursor
				var rect = get_bounding_client_rect(el, zoom_cache);
				if (rect && rect.width > 0 && rect.height > 0 &&
					rect.left <= xy[0] && rect.right >= xy[0] &&
					rect.top <= xy[1] && rect.bottom >= xy[1] &&
					array_indexof(ret, el) < 0) {
					ret.push(el);
				}
			}
			for (var i = 0; i < afterret.length; i++) {
				if (array_indexof(ret, afterret[i]) < 0)
					ret.push(afterret[i]);
			}
			if (_nir_debug_ && ret.length > 0) {
				console_log("find_els_at_point (unsorted ret)", shallowcopy(ret));
			}
			if (first_run && els_mode === "hybrid") {
				return ret;
			}
			var get_zindex_raw = function(el) {
				var zindex = get_computed_style(el).zIndex;
				var parent_zindex = 0;
				if (el.parentElement) {
					var parent_zindex = get_zindex(el.parentElement); // + 0.001; // hack: child elements appear above parent elements
					// don't use the above hack, it breaks z-ordering, the indexOf thing works already
				}
				if (zindex === "auto") {
					return parent_zindex;
				} else {
					zindex = parseFloat(zindex);
					// https://robertsspaceindustries.com/orgs/LUG/members
					if (zindex < parent_zindex)
						return parent_zindex + zindex; // hack:
					// <div style="z-index: 9"></div>
					// <div style="z-index: 10">
					//   <div style="z-index: 2">this is above z-index: 9 because it's a child of z-index: 10</div>
					// </div>
					else
						return zindex;
				}
			};
			var get_zindex = function(el) {
				if (zoom_cache) {
					var cached = map_get(zoom_cache, el);
					if (!cached || !("zIndex" in cached)) {
						var zindex = get_zindex_raw(el);
						if (cached) {
							cached.zIndex = zindex;
						} else {
							map_set(zoom_cache, el, {
								zIndex: zindex
							});
						}
						return zindex;
					} else {
						return cached.zIndex;
					}
				} else {
					return get_zindex_raw(el);
				}
			};
			// TODO: only sort elements that were added outside of elementsFromPoint
			ret.sort(function(a, b) {
				var a_zindex, b_zindex;
				a_zindex = get_zindex(a);
				b_zindex = get_zindex(b);
				//console_log(a_zindex, b_zindex, a, b);
				if (b_zindex === a_zindex) {
					// Don't modify the sort order
					return array_indexof(ret, a) - array_indexof(ret, b);
				} else {
					// opposite because we want it to be reversed (largest first)
					return b_zindex - a_zindex;
				}
			});
			if (_nir_debug_ && ret.length > 0)
				console_log("find_els_at_point (ret)", els, shallowcopy(ret), xy);
			return ret;
		}
		var get_physical_popup_el = function(el) {
			if (el.parentElement && el.tagName === "SOURCE")
				return el.parentElement;
			return el;
		};
		function trigger_popup(options) {
			if (!options) {
				options = {};
			}
			if (_nir_debug_)
				console_log("trigger_popup (options:", options, ")", current_frame_id);
			// this check is set here instead of trigger_popup_with_source because automatic requests (e.g. gallery) should be ok
			if (!settings.mouseover_allow_popup_when_fullscreen && is_fullscreen() && !is_popup_fullscreen())
				return;
			delay_handle_triggering = true;
			//var els = document.elementsFromPoint(mouseX, mouseY);
			var point = null;
			if (mousepos_initialized)
				point = [mouseX, mouseY];
			if (options.is_contextmenu && mouseContextX !== null && mouseContextY !== null)
				point = [mouseContextX, mouseContextY];
			if (point === null) {
				delay_handle_triggering = false;
				return;
			}
			var els = find_els_at_point(point);
			//console_log(els);
			if (_nir_debug_)
				console_log("trigger_popup: els =", els, "point =", point);
			// clearing in order to somewhat mitigate shift+right click issues: https://github.com/qsniyg/maxurl/issues/679
			if (options.is_contextmenu) {
				mouseContextX = null;
				mouseContextY = null;
			}
			var source = find_source(els);
			if (!source && settings.mouseover_allow_self_pagelink && popup_trigger_reason === "keyboard") {
				source = {
					el: document.body,
					src: window.location.href,
					pagelink: true
				};
			}
			if (_nir_debug_)
				console_log("trigger_popup: source =", source);
			if (source && (popup_trigger_reason !== "mouse" || get_physical_popup_el(source.el) !== last_popup_el)) {
				trigger_popup_with_source(source);
			} else {
				if (popup_trigger_reason === "keyboard") {
					if (settings.mouseover_enable_notallowed) {
						cursor_not_allowed();
					}
				}
				delay_handle_triggering = false;
			}
		}
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
		function do_get_helpers(options) {
			var baseoptions = {
				document: document,
				window: get_window(),
				host_url: window.location.href,
				do_request: do_request,
				rule_specific: {}
			};
			for (var option in options) {
				baseoptions[option] = options[option];
			}
			return get_helpers(baseoptions);
		}
		function wrap_gallery_func(nextprev, origel, el, cb, new_options) {
			if (!el)
				el = real_popup_el;
			if (!origel)
				origel = popup_orig_el;
			var options = {
				element: origel,
				document: document,
				window: get_window(),
				host_url: window.location.href,
				do_request: do_request,
				rule_specific: {},
				cb: function(result) {
					if (result === void 0 || result === "default") {
						return cb(get_next_in_gallery(el, nextprev));
					} else {
						cb(result);
					}
				}
			};
			if (new_options) {
				for (var key in new_options) {
					options[key] = new_options[key];
				}
			}
			get_bigimage_extoptions_first(options);
			get_bigimage_extoptions(options);
			var helpers = get_helpers(options);
			var gallery = get_next_in_gallery;
			if (helpers && helpers.gallery) {
				gallery = function(el, nextprev) {
					var value = helpers.gallery(el, nextprev);
					if (value || value === null)
						return value;
					return get_next_in_gallery(el, nextprev);
				};
			}
			var value = gallery(el, nextprev);
			if (value === "waiting") {
				return;
			} else if (value === "default") {
				return cb(get_next_in_gallery(el, nextprev));
			}
			return cb(value);
		}
		// https://developer.chrome.com/en/blog/tablesng/
		// keeps re-requesting the same element, which causes massive performance issues
		// <img alt="correct and incorrect table rendering" height="333" loading="lazy" sizes="(min-width: 800px) 800px, calc(100vw - 48px)" src="https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?auto=format" srcset="https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=200 200w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=228 228w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=260 260w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=296 296w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=338 338w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=385 385w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=439 439w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=500 500w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=571 571w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=650 650w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=741 741w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=845 845w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=964 964w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=1098 1098w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=1252 1252w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=1428 1428w, https://developer-chrome-com.imgix.net/image/HodOHWjMnbNw56hvNASHWSgZyAf2/Ms8AqAJn1oKmM1thWYut.png?w=1600 1600w" width="800">
		var valid_el_cache = new IMUCache();
		function is_valid_el(el) {
			if (!el)
				return false;
			if (valid_el_cache.has(el))
				return valid_el_cache.get(el);
			var result = !!find_source([el]);
			valid_el_cache.set(el, result, 3);
			return result;
		}
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
		var get_gallery_elements = function(cb, origel, el) {
			var count = 0;
			var els_set = new_set();
			var els = [];
			var firstel = el;
			if (!firstel)
				firstel = real_popup_el;
			if (firstel) {
				set_add(els_set, firstel);
				els.push(firstel);
			}
			var loop = function(nextprev, cb) {
				wrap_gallery_func(nextprev, origel, el, function(newel) {
					if (!newel || !is_valid_el(newel))
						return cb();
					count++;
					//if (count >= max) return cb();
					el = newel;
					if (!set_has(els_set, el)) {
						set_add(els_set, el);
						if (nextprev) {
							els.push(el);
						} else {
							els.unshift(el);
						}
					}
					// large galleries can cause stack overflows, as well as hanging the page
					stackoverflow_guard(function() {
						loop(nextprev, cb);
					}, count, 100);
				});
			};
			loop(false, function() {
				loop(true, function() {
					cb(els);
				});
			});
		};
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
		trigger_gallery = function(dir, cb) {
			if (!cb) {
				cb = common_functions.nullfunc;
			}
			if (popup_el_remote && can_iframe_popout() && !is_in_iframe) {
				return remote_send_message(popup_el_remote, {
					type: "trigger_gallery",
					data: {
						dir: dir
					}
				}, function(triggered) {
					cb(triggered);
				});
			}
			wrap_gallery_cycle(dir, void 0, void 0, function(newel) {
				if (newel) {
					var source = find_source([newel]);
					if (source) {
						trigger_popup_with_source(source, true, true, function(changed) {
							cb(changed);
						});
						return;
					}
				}
				return cb(false);
			});
		};
		var parse_transforms = function(transform) {
			var transforms = [];
			var transform_types = {};
			var last = 0;
			for (var i = 0; i < transform.length; i++) {
				if (transform[i] === ')') {
					var our_transform = strip_whitespace(transform.substr(last, (i - last) + 1));
					var type = our_transform.replace(/\(.*/, "");
					transforms.push(our_transform);
					if (!(type in transform_types)) {
						transform_types[type] = [];
					}
					transform_types[type].push(transforms.length - 1);
					last = i + 1;
					continue;
				}
			}
			return { transforms: transforms, types: transform_types };
		};
		var get_popup_transforms = function() {
			var style = null;
			if (popups && popups[0]) {
				var media = get_popup_media_el();
				if (media) {
					style = media.parentElement.parentElement.style;
				}
			}
			if (style && style.transform) {
				return parse_transforms(style.transform);
			} else {
				return { transforms: [], types: {} };
			}
		};
		var stringify_transforms = function(transforms) {
			return transforms.transforms.join(" ");
		};
		var set_popup_transforms = function(transforms) {
			var media = get_popup_media_el();
			if (media) {
				media.parentElement.parentElement.style.transform = stringify_transforms(transforms);
			}
		};
		var get_rotation_data_from_transforms = function(transforms) {
			var index = 0;
			if ("rotate" in transforms.types) {
				index = transforms.types.rotate[0];
			} else {
				transforms.transforms.unshift("rotate(0deg)");
			}
			var match = transforms.transforms[index].match(/^rotate\(([-0-9]+)deg\)$/);
			var deg = 0;
			if (match) {
				deg = parseInt(match[1]);
			}
			return {
				deg: deg,
				index: index
			};
		};
		var get_popup_rotation = function() {
			var transforms = get_popup_transforms();
			var rotation_data = get_rotation_data_from_transforms(transforms);
			return rotation_data.deg;
		};
		function rotate_gallery(dir) {
			if (!popups_active)
				return;
			var transforms = get_popup_transforms();
			var rotation_data = get_rotation_data_from_transforms(transforms);
			transforms.transforms[rotation_data.index] = "rotate(" + (rotation_data.deg + dir) + "deg)";
			set_popup_transforms(transforms);
			popup_createui_func(true);
		}
		// hv: vertical = true, horizontal = false
		var flip_gallery = function(hv) {
			if (!popups_active)
				return;
			var transforms = get_popup_transforms();
			var index = transforms.transforms.length;
			if ("scale" in transforms.types) {
				index = transforms.types.scale[0];
			} else {
				transforms.transforms.push("scale(1,1)");
			}
			var match = transforms.transforms[index].match(/^scale\(([-0-9.]+)\s*,\s*([-0-9.]+)\)$/);
			var scaleh = 1;
			var scalev = 1;
			if (match) {
				scaleh = parseFloat(match[1]);
				scalev = parseFloat(match[2]);
			}
			if (hv) {
				scalev = -scalev;
			} else {
				scaleh = -scaleh;
			}
			transforms.transforms[index] = "scale(" + scaleh + ", " + scalev + ")";
			set_popup_transforms(transforms);
		};
		var format_number_decimal = function(number, decimal) {
			var exp = Math_pow(10, decimal);
			;
			number *= exp;
			return (number | 0) / exp;
		};
		var get_bytes_unit = function(bytes) {
			var units = ["B", "KB", "MB", "GB", "TB", "PB"];
			while (units.length > 1 && bytes > 1024) {
				bytes /= 1024;
				units.shift();
			}
			return format_number_decimal(bytes, 2) + units[0];
		};
		function create_progress_el(position_top) {
			var progressc_el = document_createElement("div");
			set_el_all_initial(progressc_el);
			progressc_el.style.backgroundColor = "rgba(0,0,0,0.7)";
			//progressc_el.style.padding = "1em";
			progressc_el.style.height = "2em";
			progressc_el.style.zIndex = maxzindex - 2;
			var progressb_el = document_createElement("div");
			set_el_all_initial(progressb_el);
			progressb_el.style.position = "absolute";
			progressb_el.style.top = "0px";
			progressb_el.style.left = "0px";
			//progressb_el.style.backgroundColor = "#00aa00";
			progressb_el.style.backgroundColor = "#00aaff";
			progressb_el.style.height = "100%";
			progressb_el.style.width = "0%";
			progressb_el.style.zIndex = maxzindex - 1;
			progressc_el.appendChild(progressb_el);
			if (position_top) {
				progressc_el.style.position = "fixed";
				progressc_el.style.top = "0px";
				progressc_el.style.left = "0px";
				progressc_el.style.width = "80%";
				progressc_el.style.marginTop = "100px";
				progressc_el.style.marginLeft = "10%";
				document.documentElement.appendChild(progressc_el);
			}
			return progressc_el;
		}
		function update_progress_el(el, percent, remove_on_complete) {
			var bar = el.children[0];
			if (typeof percent === "number") {
				if (bar.getAttribute("data-timer")) {
					clearInterval(parseInt(bar.getAttribute("data-timer")));
					bar.removeAttribute("data-timer");
				}
				if (percent >= 1 && remove_on_complete && el.parentElement) {
					el.parentElement.removeChild(el);
				} else {
					bar.style.width = (percent * 100) + "%";
				}
			} else if (percent == "unknown") {
				bar.style.width = "10%";
				if (!bar.getAttribute("data-timer")) {
					bar.style.left = "0%";
					bar.setAttribute("data-dir", "right");
					var timer = setInterval(function() {
						var left = parseFloat(bar.style.left);
						var delta = (15 / 1000) * 1;
						var size = 90;
						if (bar.getAttribute("data-dir") == "right") {
							left += (delta * size);
							if (left >= size) {
								left = size - (left - size);
								bar.setAttribute("data-dir", "left");
							}
						} else {
							left -= (delta * size);
							if (left <= 0) {
								left = -left;
								bar.setAttribute("data-dir", "right");
							}
						}
						bar.style.left = left + "%";
					}, 15);
					bar.setAttribute("data-timer", timer);
				}
			}
		}
		var is_el_pic = function(el) {
			return el.tagName === "IMG" || el.tagName === "PICTURE";
		};
		var is_img_pic_vid = function(el) {
			return is_el_pic(el) || el.tagName === "VIDEO";
		};
		var is_img_pic_vid_link = function(el) {
			if (is_img_pic_vid(el))
				return true;
			if (settings.mouseover_links) {
				if (el.tagName === "A")
					return true;
			}
			return false;
		};
		var get_all_valid_els = function(el) {
			if (!el)
				el = document;
			return el.querySelectorAll("img, picture, video");
		};
		var get_all_valid_els_link_real = function(el) {
			if (!el)
				el = document;
			return el.querySelectorAll("img, picture, video, a");
		};
		var get_all_valid_els_link = function(el) {
			if (settings.mouseover_links) {
				return get_all_valid_els_link_real(el);
			} else {
				return get_all_valid_els(el);
			}
		};
		var copy_el = function(oldel, newel, override) {
			array_foreach(oldel.attributes, function(attr) {
				if (!newel.hasAttribute(attr.name) || override)
					newel.setAttribute(attr.name, attr.value);
			});
		};
		var duplicate_el = function(oldel) {
			var newel = document_createElement(oldel.tagName);
			copy_el(oldel, newel);
			return newel;
		};
		var replace_el = function(oldel, newel) {
			if (newel.parentElement) {
				newel = duplicate_el(newel);
				newel.removeAttribute("style"); // in case of cached element being used in popup
			}
			copy_el(oldel, newel);
			oldel.parentElement.insertBefore(newel, oldel);
			oldel.parentElement.removeChild(oldel);
		};
		var replace_with_replacement = function(options, el, replacement, url) {
			var newsrc;
			if (!replaced) {
				newsrc = get_img_src(replacement);
			}
			var do_replace = false;
			if (el.tagName === "A") {
				if (options.plainlink_replace_link) {
					el.href = newsrc;
				}
				if (options.plainlink_replace_text) {
					el.textContent = newsrc;
				}
				if (options.plainlink_replace_media) {
					do_replace = true;
				}
			}
			var el_dimensions = get_el_dimensions(el);
			var replaced = false;
			if (do_replace || (typeof replacement !== "string" && replacement.tagName === "VIDEO")) {
				if (typeof replacement !== "string") {
					// todo: only replace on either blob url (hls/dash), or when the source el was a picture
					el = replace_el(el, replacement);
					replaced = true;
				} else {
					console_warn("Unable to replace", el, "due to invalid replacement:", replacement);
					return;
				}
			}
			if (!replaced && options.replace_imgs) {
				// srcset can override src: https://github.com/qsniyg/maxurl/issues/659
				if (el.hasAttribute("srcset")) {
					el.removeAttribute("srcset");
				}
				if (get_img_src(el) !== newsrc) {
					el.src = newsrc;
				}
			}
			if (options.size_constraints === "remove") {
				el.removeAttribute("height");
				el.removeAttribute("width");
				el.style.setProperty("height", "auto", "important");
				el.style.setProperty("width", "auto", "important");
			} else if (options.size_constraints === "force" && el_dimensions && el_dimensions[0] && el_dimensions[1]) {
				el.setAttribute("height", el_dimensions[1]);
				el.removeAttribute("width", el_dimensions[0]);
				el.style.setProperty("height", el_dimensions[1] + "px", "important");
				el.style.setProperty("width", el_dimensions[0] + "px", "important");
			}
			if (options.replace_css) {
				apply_styles(el, options.replace_css, {
					force_important: true
				});
			}
			if (options.add_links) {
				var current = el;
				while (current = current.parentElement) {
					if (current.tagName === "A") {
						if (!options.replace_links)
							return;
						else
							break;
					}
				}
				if (!current) {
					current = document_createElement("a");
					el.parentElement.insertBefore(current, el);
					current.appendChild(el);
				}
				if (options.links_newtab) {
					current.target = "_blank";
				}
				if (current.href !== url) {
					current.href = url;
				}
			}
		};
		var replace_single_media = function(options, source, data, cb) {
			var waiting = false;
			if (data.data.img) {
				replace_with_replacement(options, source.el, data.data.img, data.data.obj.url);
			} else if (data.data.obj) {
				var load_image = function() {
					if (settings.replaceimgs_wait_fullyloaded && options.replace_imgs) {
						// Preload the image, as adding onload/onerror to existing images won't fire the event
						// todo: support videos
						var image = new Image();
						var finish_image = function() {
							replace_with_replacement(options, source.el, image.src, data.data.obj.url);
							cb();
						};
						image.onload = finish_image;
						image.onerror = cb;
						image.src = data.data.obj.url;
					} else {
						replace_with_replacement(options, source.el, data.data.obj.url, data.data.obj.url);
						cb();
					}
				};
				if (is_extension) {
					extension_send_message({
						type: "override_next_headers",
						data: {
							url: data.data.obj.url,
							headers: data.data.obj.headers,
							method: "GET"
						}
					}, function() {
						load_image();
					});
				} else {
					load_image();
				}
				waiting = true;
			}
			if (!waiting)
				cb();
		};
		var replacing_imgs = false;
		var replaceimgs_elcache = new IMUCache();
		function replace_images(options) {
			if (replacing_imgs || currenttab_is_image())
				return;
			var raw_imgs = options.images;
			if (raw_imgs === void 0) {
				if (options.support_plainlinks) {
					raw_imgs = get_all_valid_els_link_real();
				} else {
					raw_imgs = get_all_valid_els();
				}
			}
			// remove non-images/videos
			var imgs = [];
			if (!options.all_els_ok) {
				var parent_els = new_set();
				for (var i = 0; i < raw_imgs.length; i++) {
					var supported = is_img_pic_vid(raw_imgs[i]);
					if (!supported && options.support_plainlinks && raw_imgs[i].tagName === "A")
						supported = true;
					if (supported) {
						imgs.push(raw_imgs[i]);
						if (options.support_plainlinks) {
							var parent = raw_imgs[i].parentElement;
							while (parent) {
								set_add(parent_els, parent);
								parent = parent.parentElement;
							}
						}
					}
				}
				if (options.support_plainlinks) {
					// linked media are not plainlinks
					// fixme: does this work for non-document?
					for (var i = 0; i < imgs.length; i++) {
						if (imgs[i].tagName === "A" && set_has(parent_els, imgs[i])) {
							imgs.splice(i, 1);
							i--;
						}
					}
				}
			} else {
				imgs = raw_imgs;
			}
			if (imgs.length === 0)
				return;
			var ip;
			if (options.use_progressbar)
				console_log("Replacing images");
			var finished = 0;
			var final_progress = 1;
			if (options.finalcb && options.finalcb_progress) {
				final_progress -= options.finalcb_progress;
			}
			var finish_img = function(id) {
				finished++;
				if (options.use_progressbar) {
					//update_progress_el(progressc_el, finished / total_imgs, true);
					ip.finish_id(id);
					console_log("Finished " + finished + "/" + total_imgs);
				}
				if (finished >= total_imgs) {
					if (options.use_progressbar) {
						update_progress_el(progressc_el, final_progress, true);
					}
					//if (options.use_progressbar) {
					//	progressc_el.parentElement.removeChild(progressc_el);
					//}
					replacing_imgs = false;
					if (options.finalcb) {
						options.finalcb(function(progress) {
							if (options.use_progressbar && options.finalcb_progress) {
								update_progress_el(progressc_el, final_progress + (progress * options.finalcb_progress), true);
							}
						});
					}
				} else {
					// stack overflows are unlikely because we're mostly running from callbacks, but it may be possible if we're retrieving cached images?
					stackoverflow_guard(next_img, finished, 100);
				}
			};
			if (!options.replace_image_func) {
				options.replace_image_func = function(options, our_source, cb, domain_processed_cb, progress_cb) {
					if (options.use_elcache) {
						if (replaceimgs_elcache.has(our_source.el)) {
							domain_processed_cb();
							return cb();
						} else {
							// Not perfect, but 5 seconds should be enough
							replaceimgs_elcache.set(our_source.el, true, 5);
						}
					}
					var use_head = !settings.replaceimgs_usedata;
					var incomplete = use_head;
					var null_if_no_change = true;
					if (our_source.el.tagName === "A") {
						use_head = null_if_no_change = !options.plainlink_replace_media;
						// otherwise it'll request a lot of links, most of which aren't images
						if (!null_if_no_change) {
							null_if_no_change = !looks_like_valid_link(our_source.src, our_source.el);
						}
					}
					get_final_from_source(our_source, {
						automatic: true,
						multi: true,
						use_head: use_head,
						incomplete_image: incomplete,
						incomplete_video: incomplete,
						null_if_no_change: null_if_no_change,
						use_last_pos: false,
						progress_cb: progress_cb
					}, function(source_imu, source, processing, data) {
						domain_processed_cb();
						if (!data) {
							replace_with_replacement(options, our_source.el, our_source.src, our_source.src);
							return cb();
						}
						replace_single_media(options, source, data, cb);
					});
				};
			}
			var current_img_i = 0;
			var next_img = function() {
				var total_limit = parseInt(settings.replaceimgs_totallimit);
				if (currently_processing > total_limit) {
					currently_processing--;
					return;
				} else if (currently_processing < total_limit) {
					currently_processing++;
					next_img();
				}
				var our_source = null;
				var our_domain = null;
				var now = Date.now();
				for (var domain in domains) {
					if (domains_processing[domain] >= parseInt(settings.replaceimgs_domainlimit)) {
						continue;
					}
					var delta = now - domains_lastrequest[domain];
					var replaceimgs_delay = parseFloat(settings.replaceimgs_delay) * 1000.0;
					var wait_delay = replaceimgs_delay - delta;
					if (wait_delay > 0) {
						if (domains_timeout[domain] === null) {
							// wrap in closure to capture domain for the callback
							(function(domain) {
								domains_timeout[domain] = setTimeout(function() {
									domains_timeout[domain] = null;
									next_img();
								}, wait_delay + 1);
							})(domain);
						}
						continue;
					}
					our_domain = domain;
					domains_processing[domain]++;
					domains_lastrequest[domain] = now;
					our_source = domains[domain][0];
					domains[domain].splice(0, 1);
					if (domains[domain].length === 0) {
						delete domains[domain];
					}
					break;
				}
				if (our_source === null && other.length > 0) {
					our_source = other[0];
					other.splice(0, 1);
				}
				var our_id = current_img_i;
				current_img_i++;
				if (our_source) {
					options.replace_image_func(options, our_source, function() {
						finish_img(our_id);
					}, function() {
						if (our_domain)
							domains_processing[our_domain]--;
					}, function(progobj) {
						if (settings.replaceimgs_simple_progress) {
							var percent = progobj.loaded / progobj.total;
							progobj.total = 1;
							progobj.loaded = percent;
						}
						ip.update_progobj(our_id, progobj);
					});
				} else {
					currently_processing--;
				}
			};
			var progressc_el;
			if (options.use_progressbar) {
				progressc_el = create_progress_el(true);
			}
			var domains = {};
			var domains_processing = {};
			var domains_lastrequest = {};
			var domains_timeout = {};
			var other = [];
			var total_imgs = imgs.length;
			for (var i = 0; i < imgs.length; i++) {
				// fixme: if find_source only returns null, it will "hang" (progress bar will never close)
				var source = find_source([imgs[i]], { links: options.support_plainlinks });
				if (!source) {
					total_imgs--;
					continue;
				}
				source._replace_id = i;
				if (!source.src) {
					other.push(source);
					continue;
				}
				var domain = source.src.match(/^https?:\/\/([^/]+)\//);
				if (!domain) {
					other.push(source);
					continue;
				}
				if (!(domain[1] in domains)) {
					domains[domain[1]] = [];
					domains_processing[domain[1]] = 0;
					domains_lastrequest[domain[1]] = 0;
					domains_timeout[domain[1]] = null;
				}
				domains[domain[1]].push(source);
			}
			if (options.use_progressbar) {
				ip = new ImpreciseProgress({
					cb: function(progobj) {
						update_progress_el(progressc_el, progobj.percent * final_progress, false);
					},
					elements_num: total_imgs
				});
			}
			var currently_processing = 1;
			next_img();
		}
		var get_replace_images_options = function(options) {
			var base_options = {
				replace_imgs: settings.replaceimgs_replaceimgs,
				add_links: settings.replaceimgs_addlinks,
				replace_links: settings.replaceimgs_replacelinks,
				support_plainlinks: false,
				plainlink_replace_text: false,
				plainlink_replace_link: false,
				plainlink_replace_media: false,
				links_newtab: settings.replaceimgs_links_newtab,
				size_constraints: get_single_setting("replaceimgs_size_constraints"),
				replace_css: settings.replaceimgs_css,
				use_progressbar: true
			};
			var plainlinks_option = get_single_setting("replaceimgs_plainlinks");
			if (plainlinks_option !== "none") {
				base_options.support_plainlinks = true;
				if (plainlinks_option === "replace_link_text") {
					base_options.plainlink_replace_text = true;
					base_options.plainlink_replace_link = true;
				} else if (plainlinks_option === "replace_media") {
					base_options.plainlink_replace_media = true;
				}
			}
			if (!options)
				options = {};
			for (var key in options) {
				base_options[key] = options[key];
			}
			return base_options;
		};
		var replace_images_full = function(options) {
			var base_options = get_replace_images_options(options);
			return replace_images(base_options);
		};
		register_menucommand("Replace images", replace_images_full);
		var exit_custom_gallery = null;
		var setup_custom_gallery = function() {
			if (exit_custom_gallery)
				exit_custom_gallery();
			var base_maskel = document_createElement("div");
			set_important_style(base_maskel, "position", "absolute");
			set_important_style(base_maskel, "left", "0px");
			set_important_style(base_maskel, "top", "0px");
			set_el_all_initial(base_maskel);
			var mask_bgel = document_createElement("div");
			set_el_all_initial(mask_bgel);
			apply_styles(mask_bgel, settings.customgallery_bg_css, { force_important: true });
			set_important_style(mask_bgel, "pointer-events", "none");
			set_important_style(mask_bgel, "position", "fixed");
			set_important_style(mask_bgel, "left", "0px");
			set_important_style(mask_bgel, "top", "0px");
			set_important_style(mask_bgel, "height", "100%");
			set_important_style(mask_bgel, "width", "100%");
			set_important_style(mask_bgel, "z-index", maxzindex - 3);
			base_maskel.appendChild(mask_bgel);
			var mask_outlines_el = document_createElement("div");
			set_el_all_initial(mask_outlines_el);
			set_important_style(mask_outlines_el, "position", "absolute");
			set_important_style(mask_outlines_el, "pointer-events", "none");
			set_important_style(mask_outlines_el, "left", "0px");
			set_important_style(mask_outlines_el, "top", "0px");
			set_important_style(mask_outlines_el, "z-index", maxzindex - 2);
			base_maskel.appendChild(mask_outlines_el);
			var maskel = document_createElement("div");
			set_el_all_initial(maskel);
			set_important_style(maskel, "position", "fixed");
			set_important_style(maskel, "left", "0px");
			set_important_style(maskel, "top", "0px");
			set_important_style(maskel, "height", "100%");
			set_important_style(maskel, "width", "100%");
			set_important_style(maskel, "z-index", maxzindex);
			base_maskel.appendChild(maskel);
			set_add(exclude_find_els, maskel);
			var sources = [];
			var source_el_set = new_set();
			var _find_source = function(source) {
				for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
					var src = sources_1[_i];
					if (src.el === source.el)
						return src;
				}
				return null;
			};
			var add_source = function(source) {
				if (!source.el)
					return false;
				if (set_has(source_el_set, source.el))
					return _find_source(source) || source;
				sources.push(source);
				set_add(source_el_set, source.el);
				return source;
			};
			var remove_source = function(source) {
				var found_source = _find_source(source);
				if (found_source) {
					var index = array_indexof(sources, found_source);
					if (index >= 0)
						sources.splice(index, 1);
				}
				set_remove(source_el_set, source.el);
			};
			exit_custom_gallery = function() {
				if (alt_keydown_cb === our_keydown_cb)
					alt_keydown_cb = null;
				set_remove(exclude_find_els, maskel);
				base_maskel.parentElement.removeChild(base_maskel);
				exit_custom_gallery = null;
			};
			var our_keydown_cb = alt_keydown_cb = function(e) {
				var actions = [
					{
						key: settings.mouseover_close_key,
						action: exit_custom_gallery
					},
					{
						key: settings.customgallery_apply_key,
						action: function() {
							exit_custom_gallery();
							if (!sources.length)
								return;
							override_album = [];
							for (var _i = 0, sources_2 = sources; _i < sources_2.length; _i++) {
								var source = sources_2[_i];
								override_album.push(source.el);
							}
							trigger_popup_with_source(sources[0], true);
						}
					}
				];
				for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
					var action = actions_1[_i];
					if (!trigger_complete(action.key))
						continue;
					action.action();
					return false;
				}
			};
			our_addEventListener(maskel, "click", function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				e.stopPropagation();
				var els = find_els_at_point([mouseX, mouseY]);
				var source = find_source(els);
				if (!source || !source.el)
					return;
				source = add_source(source);
				source._real_el = source.el;
				if (source.picture)
					source._real_el = source.picture;
				if (source._outline_el) {
					// if _outline_el exists, then the source was already added previously
					// toggle
					remove_source(source);
					if (source._outline_el) {
						source._outline_el.parentElement.removeChild(source._outline_el);
					}
					return;
				}
				var rect = source._real_el.getBoundingClientRect();
				var outline_el = document_createElement("div");
				apply_styles(outline_el, settings.customgallery_outline_css, { force_important: true });
				set_important_style(outline_el, "position", "absolute");
				set_important_style(outline_el, "pointer-events", "none");
				set_important_style(outline_el, "z-index", maxzindex - 1);
				set_important_style(outline_el, "left", (rect.left + window.scrollX) + "px");
				set_important_style(outline_el, "top", (rect.top + window.scrollY) + "px");
				set_important_style(outline_el, "width", rect.width + "px");
				set_important_style(outline_el, "height", rect.height + "px");
				mask_outlines_el.appendChild(outline_el);
				source._outline_el = outline_el;
			}, { capture: true });
			document.documentElement.appendChild(base_maskel);
		};
		(function() {
			var added = false;
			var id = null;
			var update_button = function() {
				if (settings.customgallery_enable_button) {
					if (!added) {
						id = register_menucommand("Custom gallery", setup_custom_gallery);
						added = true;
					}
				} else {
					if (added) {
						unregister_menucommand(id);
						added = false;
					}
				}
			};
			update_button();
			var origfunc = settings_meta.customgallery_enable_button.onupdate;
			settings_meta.customgallery_enable_button.onupdate = function() {
				update_button();
				if (origfunc)
					return origfunc.apply(this, arguments);
			};
		})();
		var create_zip = function(files, foldername, cb, progresscb) {
			get_library("jszip", settings, do_request, function(lib) {
				if (!lib)
					return cb(null);
				var zip = new lib();
				var root = zip;
				if (foldername) {
					root = zip.folder(foldername);
				}
				for (var filename in files) {
					root.file(filename, files[filename]);
				}
				zip.generateAsync({ type: "blob" }, function(prog_info) {
					progresscb(prog_info.percent / 100);
				}).then(function(data) {
					cb(data);
				}, function(err) {
					console_error(err);
					cb(null);
				});
			});
		};
		var send_to_jdownloader = function(got_objs, foldername, cb) {
			var do_jd_request = function(req) {
				req.headers = {
					Referer: "https://qsniyg.github.io/maxurl/"
				};
				do_request(req);
			};
			var jdcheck = function(cb) {
				do_jd_request({
					method: "GET",
					url: "http://127.0.0.1:9666/jdcheckjson",
					onload: function(resp) {
						if (resp.status !== 200) {
							console_error("Unable to connect to JDownloader", resp);
							return cb(false);
						} else {
							// ensure it's valid json
							try {
								JSON.parse(resp.responseText);
							} catch (e) {
								console_error(e);
								return cb(false);
							}
							return cb(true);
						}
					}
				});
			};
			var prepare_flashgots = function() {
				var referers = {};
				var referer_policy = get_single_setting("gallery_jd_referer");
				for (var i = 0; i < got_objs.length; i++) {
					var gobj = got_objs[i];
					if (!gobj)
						continue;
					var our_obj = {
						url: gobj.obj.url,
						filename: gobj.filename || "",
						desc: ""
					};
					var referer_key = "";
					var our_referer = null;
					if (gobj.obj.headers && referer_policy !== "never") {
						our_referer = headerobj_get(gobj.obj.headers, "referer") || null;
						if (our_referer) {
							our_obj.referer = our_referer;
							referer_key = our_referer;
							// batch referers by domain, hopefully avoiding package spam
							if (referer_policy === "domain") {
								referer_key = get_domain_from_url(referer_key);
							}
						}
					}
					if (!(referer_key in referers)) {
						referers[referer_key] = {
							referer: our_referer,
							urls: []
						};
					}
					referers[referer_key].urls.push(our_obj);
				}
				var final_queries = [];
				for (var key in referers) {
					var referer_obj = referers[key];
					var urls = [];
					var descs = [];
					var fnames = [];
					array_foreach(referer_obj.urls, function(url) {
						// thanks to Jiaz from JDownloader for the directhttp trick
						urls.push("directhttp://" + url.url);
						fnames.push(url.fnames);
						descs.push(url.desc);
					});
					var query = {
						urls: urls.join("\n"),
						descriptions: descs.join("\n"),
						fnames: fnames.join("\n")
					};
					if (foldername)
						query.package = foldername;
					//if (referer_obj.referer)
					query.referer = referer_obj.referer || "";
					if (settings.gallery_jd_autostart)
						query.autostart = "1";
					final_queries.push(stringify_queries(query, true));
				}
				return final_queries;
			};
			jdcheck(function(ok) {
				if (!ok)
					return cb(false);
				var queries = prepare_flashgots();
				var queries_done = 0;
				var total_queries = queries.length;
				var query_error = false;
				array_foreach(queries, function(query) {
					do_jd_request({
						method: "GET",
						url: "http://127.0.0.1:9666/flashgot?" + query,
						onload: function(resp) {
							queries_done++;
							if (query_error)
								return;
							if (resp.status !== 200) {
								console_error("Error with flashgot api", resp);
								query_error = true;
								return cb(false);
							}
							if (queries_done >= total_queries)
								cb(true);
						}
					});
				});
			});
		};
		var download_album = function() {
			var files = {};
			var urls = new_set();
			var got_objs = [];
			var infos = {};
			var failed_infos = [];
			var filename = null;
			var download_method = get_single_setting("gallery_download_method");
			var set_zip_filename = function(obj) {
				if (filename || !obj)
					return;
				var our_vars = deepcopy(obj.format_vars);
				our_vars.ext = ".zip";
				// got_objs is used because files is not populated for jdownloader
				our_vars.items_amt = Object.keys(got_objs).length.toString(); //Object.keys(files).length.toString();
				//our_vars.filename = our_vars.filename_noext + our_vars.ext;
				filename = get_filename_from_format(settings.gallery_zip_filename_format, our_vars);
				if (!filename)
					filename = "download";
				if (!/\.zip$/i.test(filename))
					filename += ".zip";
			};
			var get_trunc_url = function(url) {
				if (/^https?:\/\//i.test(url))
					return url;
				return url.substr(0, 1000); // to avoid huge data urls
			};
			var get_host_info = function() {
				var info = {};
				info.url = window_location;
				try {
					var our_window = get_window();
					var href1 = our_window.location.href;
					if (href1 !== window_location) {
						info.url_orig = window_location;
						info.url = href1;
					}
					info.title = document.title;
					info.download_time = new Date().toString();
				} catch (e) {
					console_error(e);
				}
				return info;
			};
			var get_failed_info = function(source) {
				var info = {};
				info.num_in_gallery = source._replace_id + 1;
				var source_src = source.src;
				if (source_src)
					info.url = get_trunc_url(source_src);
				return info;
			};
			var get_info_for_file = function(filename, obj, origurl, source) {
				var info = {};
				info.num_in_gallery = source._replace_id + 1;
				info.download_url = get_trunc_url(origurl);
				if (obj.headers)
					info.download_headers = obj.headers;
				var source_src = source.src;
				if (source_src && source_src !== origurl) {
					info.thumb_url = get_trunc_url(source_src);
				}
				info.filename = filename;
				if (obj.filename !== filename) {
					info.orig_filename = obj.filename;
				}
				if (obj.filesize)
					info.filesize = obj.filesize;
				if (obj.extra) {
					obj_foreach(obj.extra, function(key, value) {
						if (value !== null && value !== "")
							info["extra_" + key] = value;
					});
				}
				return info;
			};
			var unix_to_dos = function(txt) {
				return txt.replace(/\r*\n/g, "\r\n");
			};
			var get_info_file = function() {
				var header = get_host_info();
				var file = [];
				file.push(" --- Page info ---", "");
				file.push(JSON_stringify(header, null, "\t"));
				file.push("", " --- Files ---", "");
				for (var i = 0; i < got_objs.length; i++) {
					if (!got_objs[i] || !got_objs[i].filename)
						continue;
					var filename = got_objs[i].filename;
					file.push(filename);
					file.push(JSON_stringify(infos[i], null, "\t"));
					file.push("");
				}
				if (failed_infos.length) {
					file.push("", " --- Failed ---", "");
					array_foreach(failed_infos, function(info) {
						file.push(JSON_stringify(info, null, "\t"));
						file.push("");
					});
				}
				return unix_to_dos(file.join("\n"));
			};
			var get_first_obj = function() {
				for (var i = 0; i < got_objs.length; i++) {
					if (!got_objs[i] || !got_objs[i].obj)
						continue;
					return got_objs[i].obj;
				}
			};
			var add_file = function(data, our_source, progresscb, cb) {
				if (!data || !data.data || !data.data.obj) {
					console_error("Invalid data", data, our_source);
					return cb();
				}
				var src = data.data.obj.url;
				if (data.data.resp) {
					if (!data.data.resp.finalUrl) {
						console_error("Unable to load image from", data, our_source);
						return cb();
					}
					src = data.data.resp.finalUrl;
				}
				// fixme: if img is blob, we need to free it
				if (data.data.img) {
					// otherwise it'll both use bandwidth and play the audio
					if (data.data.img.tagName === "VIDEO") {
						data.data.img.pause();
					}
					src = get_img_src(data.data.img);
				}
				var obj = data.data.obj || {};
				var origurl = obj.url;
				var filename = null; // to be filled by fill_filename
				//obj = overlay_object(obj, { url: src });
				if (set_has(urls, origurl)) {
					return cb();
				} else {
					set_add(urls, origurl);
				}
				var fill_filename = function(use_download) {
					fill_obj_filename(obj, origurl, data.data.respdata);
					filename = obj.filename;
					// this should hopefully not happen
					if (use_download && !filename)
						filename = "download";
					if (filename && filename in files) {
						var i = 1;
						var new_filename;
						var splitted = url_basename(filename, { split_ext: true });
						do {
							new_filename = splitted[0] + " (" + (i++) + ")";
							if (splitted[1]) {
								new_filename += "." + splitted[1];
							}
						} while (new_filename in files);
						filename = new_filename;
					}
					return filename;
				};
				var final_cb = function() {
					if (settings.gallery_zip_add_info_file) {
						infos[our_source._replace_id] = get_info_for_file(filename, obj, origurl, our_source);
					}
					got_objs[our_source._replace_id] = { obj: obj, filename: filename };
					cb();
				};
				if (download_method === "jdownloader") {
					fill_filename(false);
					final_cb();
					return;
				}
				// todo: some kind of infoobj_to_requestobj function
				request_chunked({
					url: src,
					headers: obj.headers
				}, {
					onload: function(resp) {
						fill_filename(true);
						files[filename] = resp.data;
						final_cb();
					},
					onprogress: progresscb
				});
			};
			var process_gallery_els = function(els) {
				replace_images_full({
					images: els,
					all_els_ok: true,
					replace_image_func: function(options, our_source, cb, domain_processed_cb, progress_cb) {
						//console_log(our_source);
						var gffs_options = {
							automatic: true,
							multi: true,
							use_head: false,
							incomplete_image: false,
							incomplete_video: true, // hack to force request_chunked
							deny_nondirect_delivery: true,
							deny_cache: true,
							null_if_no_change: !settings.gallery_download_unchanged,
							use_last_pos: false,
							progress_cb: progress_cb
						};
						if (download_method === "jdownloader") {
							gffs_options.use_head = true;
							gffs_options.incomplete_image = true;
							gffs_options.incomplete_video = true;
						}
						get_final_from_source(our_source, gffs_options, function(source_imu, source, processing, data) {
							domain_processed_cb();
							if (!data) {
								if (typeof source === "undefined" && !settings.gallery_download_unchanged) {
									console_warn("Not downloading unchanged image", our_source);
								} else {
									// source is undefined for non-existing urls too
									console_error("Unable to download", source, our_source);
									if (settings.gallery_zip_add_info_file) {
										failed_infos.push(get_failed_info(our_source));
									}
								}
								return cb();
							} else {
								add_file(data, our_source, function(progobj) { }, cb);
							}
						});
					},
					finalcb: function(onprogress) {
						if ((download_method === "zip" && !Object.keys(files).length) ||
							!got_objs.length) {
							console_error("No files!");
							onprogress(1);
							return;
						}
						set_zip_filename(get_first_obj());
						filename = filename || "download.zip";
						var foldername = filename.replace(/\.zip$/i, "");
						var zip_foldername = null;
						if (settings.gallery_zip_add_tld) {
							zip_foldername = foldername;
						}
						if (settings.gallery_zip_add_info_file) {
							files["info.txt"] = get_info_file();
						}
						start_waiting();
						if (download_method === "jdownloader") {
							send_to_jdownloader(got_objs, foldername, function(ok) {
								onprogress(1);
								if (!ok) {
									cursor_not_allowed();
								} else {
									stop_waiting();
								}
							});
						} else {
							create_zip(files, zip_foldername, function(data) {
								onprogress(1);
								if (!data) {
									cursor_not_allowed();
									return;
								} else {
									stop_waiting();
								}
								do_blob_download(data, filename);
							}, onprogress);
						}
					},
					finalcb_progress: 0.1
				});
			};
			// fetching the gallery elements can take time if it's a large gallery, so let the user know we have received input
			// no, don't do this (yet)! it'll take longer to update the css of every element than it will to fetch the gallery elements (tested with 5000)
			//start_waiting();
			get_gallery_elements(function(els) {
				//stop_waiting();
				process_gallery_els(els);
			});
		};
		var generate_random_class = function(name) {
			return "imu-" + get_random_text(10) + "-" + name;
		};
		var highlightimgs_styleel = null;
		var highlightimgs_classname = generate_random_class("highlight");
		var create_highlight_styleel = function() {
			if (highlightimgs_styleel || !/^text\//.test(document.contentType))
				return;
			highlightimgs_styleel = document_createElement("style");
			document.documentElement.appendChild(highlightimgs_styleel);
			update_highlight_styleel();
		};
		var update_highlight_styleel = function() {
			create_highlight_styleel();
			if (highlightimgs_styleel) {
				highlightimgs_styleel.innerText = "." + highlightimgs_classname + "{" + get_styletag_styles(settings.highlightimgs_css) + "}";
			}
		};
		(function() {
			var oldfunc = settings_meta.highlightimgs_css.onupdate;
			settings_meta.highlightimgs_css.onupdate = function() {
				update_highlight_styleel();
				if (oldfunc)
					return oldfunc.apply(this, arguments);
			};
		})();
		var apply_highlight_style = function(target) {
			create_highlight_styleel();
			target.classList.add(highlightimgs_classname);
		};
		var remove_highlight_style = function(target) {
			target.classList.remove(highlightimgs_classname);
		};
		var check_highlightimgs_valid_image = function(el) {
			var src = get_img_src(el);
			if (!is_valid_src(src, is_video_el(el)) || (el.tagName === "A" && !looks_like_valid_link(src, el)))
				return false;
			return true;
		};
		var get_highlightimgs_valid_image = function(el) {
			// TODO: dynamic attribute name
			if (el.hasAttribute("data-imu-valid")) {
				return !!parse_boolean(el.getAttribute("data-imu-valid"));
			}
			var valid = check_highlightimgs_valid_image(el);
			el.setAttribute("data-imu-valid", valid + "");
			return valid;
		};
		var get_highlightimgs_supported_image = function(el) {
			// TODO: dynamic attribute name
			if (el.hasAttribute("data-imu-supported")) {
				return !!parse_boolean(el.getAttribute("data-imu-supported"));
			}
			var supported = check_highlightimgs_supported_image(el);
			el.setAttribute("data-imu-supported", supported + "");
			return supported;
		};
		var auto_highlighted_imgs = [];
		var highlight_images = function(options) {
			if (currenttab_is_image() && settings.mouseover_exclude_imagetab)
				return;
			if (!options) {
				options = {};
			}
			var images = options.images;
			if (images === void 0) {
				images = get_all_valid_els_link();
			}
			if (!images.length)
				return;
			for (var i = 0; i < images.length; i++) {
				if (!get_highlightimgs_valid_image(images[i]))
					continue;
				var supported = !settings.highlightimgs_onlysupported;
				if (settings.highlightimgs_onlysupported) {
					supported = get_highlightimgs_supported_image(images[i]);
				}
				if (!options.hoveronly) {
					if (supported) {
						if (options.is_auto && array_indexof(auto_highlighted_imgs, images[i]) < 0) {
							auto_highlighted_imgs.push(images[i]);
						}
						apply_highlight_style(images[i]);
					} else {
						remove_highlight_style(images[i]);
					}
				}
			}
		};
		(function() {
			var added = false;
			var id = null;
			var update_button = function() {
				if (settings.highlightimgs_enable) {
					if (!added) {
						id = register_menucommand("Highlight images", highlight_images);
						added = true;
					}
				} else {
					if (added) {
						unregister_menucommand(id);
						added = false;
					}
				}
			};
			update_button();
			var origfunc = settings_meta.highlightimgs_enable.onupdate;
			settings_meta.highlightimgs_enable.onupdate = function() {
				update_button();
				if (origfunc)
					return origfunc.apply(this, arguments);
			};
		})();
		var popup_mouse_head = function() {
			if (delay_handle_triggering)
				return false;
			var enabledisable_toggle = get_single_setting("mouseover_trigger_enabledisable_toggle");
			if (trigger_complete(settings.mouseover_trigger_prevent_key)) {
				if (enabledisable_toggle === "disable")
					return false;
			} else {
				if (enabledisable_toggle === "enable")
					return false;
			}
			popup_trigger_reason = "mouse";
			return true;
		};
		var image_mouseover = function(e) {
			if (currenttab_is_image() && settings.mouseover_exclude_imagetab)
				return;
			if (get_single_setting("highlightimgs_auto") === "hover" && get_highlightimgs_valid_image(e.target)) {
				var supported = !settings.highlightimgs_onlysupported;
				if (!supported) {
					supported = get_highlightimgs_supported_image(e.target);
				}
				if (supported) {
					if (array_indexof(auto_highlighted_imgs, e.target) < 0)
						auto_highlighted_imgs.push(e.target);
					apply_highlight_style(e.target);
				}
			}
			if (mouseover_mouse_enabled() && settings.mouseover_trigger_mouseover && !delay_handle && !should_exclude_imagetab()) {
				delay_el = e.target;
				update_mouse_from_event(e);
				delay_handle = setTimeout(function() {
					delay_el = null;
					if (delay_handle) {
						clearTimeout(delay_handle);
						delay_handle = null;
					}
					if (!popup_mouse_head())
						return;
					// TODO: make configurable
					if (false) {
						var source = find_source([e.target]);
						if (source && get_physical_popup_el(source.el) !== last_popup_el) {
							trigger_popup_with_source(source);
						}
					} else {
						trigger_popup();
					}
				}, delay * 1000);
			}
		};
		var image_mouseout = function(e) {
			if (get_single_setting("highlightimgs_auto") === "hover" && get_highlightimgs_valid_image(e.target)) {
				remove_highlight_style(e.target);
			}
			if (mouseover_mouse_enabled() && settings.mouseover_trigger_mouseover && delay_handle) {
				if (delay_el === e.target) {
					clearTimeout(delay_handle);
					delay_handle = null;
				}
			}
		};
		function on_new_images(images) {
			var highlight = get_single_setting("highlightimgs_auto");
			if (highlight === "always" || highlight === "hover")
				highlight_images({ images: images, hoveronly: highlight === "hover", is_auto: true });
			for (var i = 0; i < images.length; i++) {
				// apparently this isn't needed to ensure no duplicate event listeners?
				our_removeEventListener(images[i], "mouseover", image_mouseover);
				our_removeEventListener(images[i], "mouseout", image_mouseout);
				our_addEventListener(images[i], "mouseover", image_mouseover);
				our_addEventListener(images[i], "mouseout", image_mouseout);
			}
			if (settings.replaceimgs_auto)
				replace_images_full({ images: images, use_progressbar: false, use_elcache: true });
		}
		;
		(function() {
			if (is_suspended())
				return;
			// TODO: allow this to be automatically updated
			if (!host_filter(window.location.href))
				return;
			var observer;
			var observe_options = { childList: true, subtree: true, attributes: true };
			var new_mutationobserver = function() {
				return new MutationObserver(function(mutations, observer) {
					var images = [];
					var add_nodes = function(nodes) {
						for (var i = 0; i < nodes.length; i++) {
							if (is_img_pic_vid_link(nodes[i])) {
								images.push(nodes[i]);
							}
							if (nodes[i].children) {
								add_nodes(nodes[i].children);
							}
						}
					};
					for (var i = 0; i < mutations.length; i++) {
						var mutation = mutations[i];
						if (mutation.addedNodes) {
							add_nodes(mutation.addedNodes);
						}
						if (mutation.target && mutation.type === "attributes") {
							if (mutation.attributeName === "src" || mutation.attributeName === "href" || mutation.attributeName === "srcset") {
								add_nodes([mutation.target]);
							}
						}
					}
					if (images.length > 0) {
						on_new_images(images);
					}
				});
			};
			var observe = function() {
				if (is_suspended())
					return;
				on_new_images(get_all_valid_els_link());
				if (!observer)
					return;
				observer.observe(document, observe_options);
			};
			var remove_all_highlights = function() {
				for (var i = 0; i < auto_highlighted_imgs.length; i++) {
					remove_highlight_style(auto_highlighted_imgs[i]);
				}
				auto_highlighted_imgs = [];
			};
			var disconnect = function() {
				remove_all_highlights();
				if (!observer)
					return;
				observer.disconnect();
			};
			termination_hooks.push(disconnect);
			var needs_observer = function() {
				var highlight = get_single_setting("highlightimgs_auto");
				return highlight === "always" || highlight === "hover" || settings.replaceimgs_auto || (mouseover_mouse_enabled() && settings.mouseover_trigger_mouseover);
			};
			var create_mutationobserver = function() {
				try {
					// In case the browser doesn't support MutationObservers
					observer = new_mutationobserver();
				} catch (e) {
					console_warn(e);
				}
				if (needs_observer()) {
					observe();
				}
			};
			create_mutationobserver();
			var update_highlightimgs_func = function() {
				if (needs_observer()) {
					if (get_single_setting("highlightimgs_auto") !== "always") {
						remove_all_highlights();
					}
					observe();
				} else {
					disconnect();
				}
			};
			// replaceimgs_auto is intentionally not added here due to the warning
			var orig_highlightfunc = settings_meta.highlightimgs_auto.onupdate;
			settings_meta.highlightimgs_auto.onupdate = function() {
				if (orig_highlightfunc)
					orig_highlightfunc();
				update_highlightimgs_func();
			};
			var orig_imuenabledfunc = settings_meta.imu_enabled.onupdate;
			settings_meta.imu_enabled.onupdate = function() {
				if (orig_imuenabledfunc)
					orig_imuenabledfunc.apply(this, arguments);
				if (settings.imu_enabled) {
					update_highlightimgs_func();
				} else {
					disconnect();
				}
			};
		})();
		var get_popup_media_el = function() {
			var imgels = popups[0].getElementsByTagName("video");
			if (imgels.length === 0)
				imgels = popups[0].getElementsByTagName("img");
			if (imgels.length > 0)
				return imgels[0];
			else
				return null;
		};
		var get_popup_media_url = function() {
			var el = get_popup_media_el();
			if (el)
				return el.src;
			else
				return null;
		};
		var download_popup_image = function() {
			do_download(popup_obj, popup_obj.filename, popup_contentlength);
		};
		var download_popup_media = function() {
			if (popup_obj.media_info && popup_obj.media_info.delivery && settings.enable_stream_download) {
				start_waiting();
				get_download_urls_from_infoobj(popup_obj, function(urls) {
					if (!urls) {
						cursor_not_allowed();
						return;
					}
					//console_log("urls", urls);
					// todo: only request ffmpeg if necessary
					get_ffmpeg(function(ffmpeg) {
						if (!ffmpeg) {
							cursor_not_allowed();
							return;
						}
						stop_waiting();
						var progress_el = create_progress_el(true);
						var last_console_progress = 0;
						download_playlist_urls(popup_obj, urls, function(progobj) {
							var now = Date.now();
							if (now - last_console_progress > 50) {
								last_console_progress = now;
								var percent = format_number_decimal(progobj.percent * 100, 2);
								var loaded_bytes = get_bytes_unit(progobj.loaded);
								var total_bytes = get_bytes_unit(progobj.total);
								var accurate = progobj.total_accurate ? "" : "~";
								console_log(loaded_bytes + " / " + accurate + total_bytes + " (" + percent + "%)");
							}
							update_progress_el(progress_el, progobj.percent * 0.9, true);
						}, function(data) {
							//console_log("final data", data);
							ffmpeg_join(ffmpeg, data, function(percent) {
								update_progress_el(progress_el, 0.9 + (percent * 0.1), true);
							}, function(filename) {
								update_progress_el(progress_el, 1, true);
								//console_log(filename);
								var data = ffmpeg.FS("readFile", filename);
								new_blob(data, function(blob) {
									var out_ext = url_basename(filename, { split_ext: true })[1];
									var out_filename = url_basename(popup_obj.filename || "download", { split_ext: true, known_ext: true })[0] + "." + out_ext;
									do_blob_download(blob, out_filename, function() {
										ffmpeg.FS("unlink", filename);
									});
								});
							});
						});
					});
				});
			} else {
				download_popup_image();
			}
		};
		var get_popup_video = function() {
			var videoel = popups[0].getElementsByTagName("video");
			// TODO: rename this function to get_popup_stream
			if (!videoel || videoel.length === 0) {
				videoel = popups[0].getElementsByTagName("audio");
			}
			if (!videoel || videoel.length === 0) {
				return null;
			}
			return videoel[0];
		};
		var seek_popup_video = function(leftright, amount) {
			var timemul = leftright ? -1 : 1;
			if (typeof amount === "undefined")
				amount = settings.mouseover_video_seek_amount;
			var time = timemul * amount;
			var videoel = get_popup_video();
			if (!videoel)
				return;
			videoel.currentTime += time;
		};
		var framestep_popup_video = function(leftright) {
			var videoel = get_popup_video();
			if (!videoel)
				return;
			videoel.pause();
			seek_popup_video(leftright, 1.0 / settings.mouseover_video_framerate);
		};
		var popup_video_speed = function(downup) {
			var videoel = get_popup_video();
			if (!videoel)
				return;
			if (typeof downup !== "number") {
				var amount = settings.mouseover_video_speed_amount;
				if (downup === true)
					amount = -amount;
				videoel.playbackRate += amount;
			} else {
				videoel.playbackRate = downup;
			}
		};
		var popup_video_volume = function(downup) {
			var videoel = get_popup_video();
			if (!videoel)
				return;
			if (typeof downup !== "number") {
				var amount = settings.mouseover_video_volume_change_amt;
				if (downup === true)
					amount = -amount;
				var new_volume = videoel.volume + (amount / 100.);
				new_volume = Math_min(Math_max(new_volume, 0), 1);
				videoel.volume = new_volume;
			} else {
				videoel.volume = downup;
			}
		};
		var toggle_video_muted = function() {
			var videoel = get_popup_video();
			if (!videoel)
				return;
			videoel.muted = !videoel.muted;
		};
		var toggle_video_controls = function() {
			var videoel = get_popup_video();
			if (!videoel)
				return;
			if (videoel.getAttribute("controls") === "controls") {
				videoel.removeAttribute("controls");
			} else {
				videoel.setAttribute("controls", "controls");
			}
		};
		var play_video = function(el) {
			try {
				el.play();
			} catch (e) {
				console_warn("Unable to autoplay", el, e);
			}
		};
		var toggle_video_playing = function() {
			var videoel = get_popup_video();
			if (!videoel)
				return;
			if (videoel.paused) {
				play_video(videoel);
			} else {
				videoel.pause();
			}
		};
		var toggle_popup_ui = function() {
			popup_createui_func(true, "toggle");
		};
		var is_fullscreen = function() {
			return document.fullscreenElement !== null || document.fullscreen;
		};
		var is_popup_fullscreen = function() {
			return is_fullscreen() && popup_is_fullscreen;
		};
		var popup_set_fullscreen = function() {
			var media_el = get_popup_media_el();
			media_el.requestFullscreen().then(function(e) {
				popup_is_fullscreen = true;
			}, function(e) {
				console_error("Error loading fullscreen", e);
			});
		};
		var exit_fullscreen = function() {
			document.exitFullscreen();
			popup_is_fullscreen = false;
		};
		var popup_toggle_fullscreen = function() {
			if (!is_fullscreen()) {
				popup_set_fullscreen();
			} else {
				exit_fullscreen();
			}
		};
		var popup_active = function() {
			return popups_active && popup_el;
		};
		var can_use_hold_key = function() {
			if (!popups_active)
				return false;
			if (popup_trigger_reason !== "mouse") {
				var auto_close = settings.mouseover_auto_close_popup && settings.mouseover_auto_close_popup_time;
				var close_mouseout = get_close_need_mouseout();
				if (!auto_close && !close_mouseout)
					return false;
			}
			return settings.mouseover_use_hold_key;
		};
		var update_popup_hold = function() {
			if (!popups_active)
				return;
			var hold_zoom = get_single_setting("popup_hold_zoom");
			if (popup_update_zoom_func && hold_zoom !== "none") {
				if (popup_hold) {
					popup_update_zoom_func(hold_zoom);
				} else {
					popup_update_zoom_func("last");
				}
			}
			if (popup_update_pos_func && settings.mouseover_hold_position_center) {
				var newpos = popup_update_pos_func(mouseX, mouseY, true);
				popups[0].style.top = newpos[1] + "px";
				popups[0].style.left = newpos[0] + "px";
			}
			popup_hold_func();
		};
		var toggle_popup_hold = function() {
			popup_hold = !popup_hold;
			clear_resetpopup_timeout();
			if (!popup_hold && (can_close_popup[1] || settings.mouseover_hold_close_unhold)) {
				action_handler({ type: "resetpopups" });
			} else {
				update_popup_hold();
			}
		};
		var get_video_screenshot = function(video, cb) {
			var canvas = document_createElement("canvas");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			var context = canvas.getContext("2d");
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			var mime = "image/png";
			var screenshot_format = get_single_setting("popup_video_screenshot_format");
			if (screenshot_format === "jpg")
				mime = "image/jpeg";
			return cb(get_canvas_src(canvas, mime));
		};
		var screenshot_video = function() {
			var videoel = get_popup_video();
			if (!videoel)
				return;
			get_video_screenshot(videoel, function(data) {
				if (!data) {
					console_error("Unable to screenshot video");
					cursor_not_allowed();
					return;
				}
				var our_vars = deepcopy(popup_obj.format_vars);
				our_vars.is_screenshot = { usable: true };
				our_vars.ext = ".png";
				if (get_single_setting("popup_video_screenshot_format") === "jpg") {
					our_vars.ext = ".jpg";
				}
				our_vars.filename = our_vars.filename_noext + our_vars.ext;
				var screenshot_filename = get_filename_from_format(settings.filename_format, our_vars);
				do_download({
					url: data
				}, screenshot_filename);
			});
		};
		var action_handler = function(action) {
			if (_nir_debug_) {
				console_log("action_handler", action);
			}
			if (action.needs_popup && !popup_active())
				return;
			switch (action.type) {
				case "resetpopups":
					resetpopups();
					return true;
				case "replace_images":
					replace_images_full();
					return true;
				case "highlight_images":
					highlight_images();
					return true;
				case "custom_gallery":
					setup_custom_gallery();
					return true;
				case "trigger_popup":
					if (action.trigger === "keyboard") {
						popup_trigger_reason = "keyboard";
					}
					trigger_popup();
					return true;
				case "gallery_prev":
					trigger_gallery(-1);
					return true;
				case "gallery_next":
					trigger_gallery(1);
					return true;
				case "download":
					download_popup_media();
					return true;
				case "open_in_new_tab":
					open_in_tab_imu(popup_obj, action.background_tab);
					return true;
				case "rotate_left":
					rotate_gallery(-90);
					return true;
				case "rotate_right":
					rotate_gallery(90);
					return true;
				case "flip_horizontal":
					flip_gallery(false);
					return true;
				case "flip_vertical":
					flip_gallery(true);
					return true;
				case "zoom_in":
					popup_zoom_func("incremental", -1);
					return true;
				case "zoom_out":
					popup_zoom_func("incremental", 1);
					return true;
				case "zoom_full":
					popup_zoom_func("fitfull", -1);
					return true;
				case "zoom_fit":
					popup_zoom_func("fitfull", 1);
					return true;
				case "fullscreen":
					popup_toggle_fullscreen();
					return true;
				case "seek_left":
					seek_popup_video(true);
					return true;
				case "seek_right":
					seek_popup_video(false);
					return true;
				case "frame_left":
					framestep_popup_video(true);
					return true;
				case "frame_right":
					framestep_popup_video(false);
					return true;
				case "speed_down":
					popup_video_speed(true);
					return true;
				case "speed_up":
					popup_video_speed(false);
					return true;
				case "reset_speed":
					popup_video_speed(1);
					return true;
				case "volume_up":
					popup_video_volume(false);
					return true;
				case "volume_down":
					popup_video_volume(true);
					return true;
				case "toggle_mute":
					toggle_video_muted();
					return true;
				case "toggle_controls":
					toggle_video_controls();
					return true;
				case "toggle_play_pause":
					toggle_video_playing();
					return true;
				case "open_options":
					open_in_tab_imu({ url: get_options_page() }, false);
					return true;
				case "open_orig_page":
					if (popup_obj && popup_obj.extra && popup_obj.extra.page) {
						open_in_tab_imu({ url: popup_obj.extra.page }, false);
					} else {
						console_log("Unable to find original page for", popup_obj);
					}
					return true;
				case "hold":
					update_popup_hold();
					return true;
				case "toggle_hold":
					toggle_popup_hold();
					return true;
				case "toggle_ui":
					toggle_popup_ui();
					return true;
				case "copy_link":
					if (popup_obj && popup_obj.url) {
						clipboard_write_link(popup_obj.url, function(success) {
							if (!success)
								console_warn("Unable to write url to clipboard:", popup_obj.url);
						});
					} else {
						console_warn("Popup not open?");
					}
					return true;
				case "screenshot_video":
					screenshot_video();
					return true;
				case "download_gallery":
					download_album();
					return true;
			}
			return false;
		};
		var action_remote = function(actions) {
			// use can_use_remote instead of can_iframe_popout because this doesn't necessarily pop out of iframes
			if (can_use_remote()) {
				var recipient = "top";
				var has_mouse = true;
				if (!is_in_iframe) {
					recipient = mouse_frame_id;
					if (recipient === "top") {
						has_mouse = false;
						if (popup_el_remote) {
							recipient = popup_el_remote;
						} else {
							return;
						}
					}
				}
				//console_log(deepcopy(actions));
				for (var i = 0; i < actions.length; i++) {
					if (!has_mouse && actions[i].requires_mouse) {
						actions.splice(i, 1);
						i--;
					}
				}
				if (actions.length > 0) {
					remote_send_message(recipient, {
						type: "action",
						data: actions
					});
				}
			}
		};
		var inputels_cache = new IMUCache();
		var is_inputel = function(el) {
			if (el.tagName === "TEXTAREA")
				return true;
			if (el.tagName === "INPUT") {
				if (!el.hasAttribute("type") || el.getAttribute("type") === "text") {
					return true;
				}
			}
			do {
				if (el.hasAttribute("contenteditable")) {
					return true;
				}
			} while (el = el.parentElement);
			return false;
		};
		var update_contextmenu_pos = function(event) {
			mouseContextX = event.clientX;
			mouseContextY = event.clientY;
			mouseAbsContextX = event.pageX;
			mouseAbsContextY = event.pageY;
		};
		var do_event_return = function(event, retval) {
			if (retval === false) {
				try {
					event.preventDefault();
					event.stopImmediatePropagation();
					event.stopPropagation();
				} catch (e) { }
			}
			return retval;
		};
		// https://github.com/qsniyg/maxurl/issues/680
		// contextmenu and mousedown are both run for right click, same timeStamp
		var event_cache = new IMUCache();
		var get_event_cache_key = function(event) {
			var down = true;
			if (event.type === "mouseup" || event.type === "keyup")
				down = false;
			var keystrs = get_keystrs_map(event, down);
			var keystrs_arr = [];
			for (var key in keystrs) {
				keystrs_arr.push(key + ":" + keystrs[key]);
			}
			return down + " " + keystrs_arr.join(",") + " " + event.timeStamp;
		};
		var alt_keydown_cb = null;
		var keydown_cb = function(event) {
			// otherwise rebinding the trigger key will fail
			if (is_options_page)
				return;
			if (_nir_debug_) nir_debug("input", "keydown_cb", event);
			if (!mouseover_base_enabled())
				return;
			if (event.type === "wheel" && chord_is_only_wheel(current_chord))
				return;
			if (event.type === "keydown") {
				// thanks to lnp5131 on github: https://github.com/qsniyg/maxurl/issues/415#issuecomment-684847125
				// it seems that even keys like control will cause a repeat under certain configurations
				if (event.repeat)
					return;
				if (editing_text)
					return;
				if (settings.disable_keybind_when_editing && event.target) {
					var is_bad = inputels_cache.get(event.target);
					if (is_bad === void 0) {
						is_bad = is_inputel(event.target);
						inputels_cache.set(event.target, is_bad, 60);
					}
					if (is_bad === true) {
						return;
					}
				}
			}
			var ret = void 0;
			var actions = [];
			update_chord(event, true);
			var event_cache_key = get_event_cache_key(event);
			if (event_cache.has(event_cache_key)) {
				return do_event_return(event, event_cache.get(event_cache_key));
			}
			if (is_extension && settings.extension_contextmenu && event.type === "mousedown") {
				// https://github.com/qsniyg/maxurl/issues/679
				if (trigger_complete(["shift", "button2"])) {
					update_contextmenu_pos(event);
				}
			}
			if (alt_keydown_cb) {
				ret = alt_keydown_cb(event);
				if (ret === false)
					return do_event_return(event, ret);
			}
			if (settings.mouseover) {
				if (get_single_setting("mouseover_trigger_behavior") === "keyboard") {
					var triggers = [settings.mouseover_trigger_key];
					for (var i = 0; i < num_profiles; i++) {
						triggers.push(settings["mouseover_trigger_key_t" + (i + 2)]);
					}
					array_foreach(triggers, function(trigger, i) {
						if (!event_in_chord(event, trigger))
							return;
						if (trigger_complete(trigger) && !popups_active) {
							// clear timeout so that all/any close behavior works
							current_chord_timeout = {};
							if (!delay_handle) {
								actions.push({
									requires_mouse: true,
									type: "trigger_popup",
									trigger: "keyboard"
								});
								ret = false;
								release_ignore = trigger;
							}
							trigger_id = i ? (i + 1) : null;
							if (get_tprofile_setting("mouseover_open_behavior") !== "popup") {
								// especially relevant for new tab
								clear_chord();
							}
						}
						var close_behavior = get_close_behavior();
						if (close_behavior === "all" || (close_behavior === "any" && trigger_complete(trigger))) {
							can_close_popup[0] = false;
						}
					});
				}
			}
			if (settings.replaceimgs_enable_keybinding && trigger_complete(settings.replaceimgs_keybinding)) {
				actions.push({ type: "replace_images" });
				ret = false;
				release_ignore = settings.replaceimgs_keybinding;
			}
			if (settings.highlightimgs_enable_keybinding && trigger_complete(settings.highlightimgs_keybinding)) {
				actions.push({ type: "highlight_images" });
				ret = false;
				release_ignore = settings.highlightimgs_keybinding;
			}
			if (settings.customgallery_enable_keybinding && trigger_complete(settings.customgallery_keybinding)) {
				actions.push({ type: "custom_gallery" });
				ret = false;
				release_ignore = settings.customgallery_keybinding;
			}
			// don't run if another function above was already triggered (e.g. when close is bound to the same key as trigger)
			if (settings.mouseover && ret !== false) {
				var is_popup_active = popup_el_remote || (popup_active());
				var keybinds = [
					{
						key: settings.mouseover_close_key,
						action: { type: "resetpopups" }
					},
					{
						key: settings.mouseover_gallery_prev_key,
						action: { type: "gallery_prev" },
						requires: settings.mouseover_enable_gallery
					},
					{
						key: settings.mouseover_gallery_next_key,
						action: { type: "gallery_next" },
						requires: settings.mouseover_enable_gallery
					},
					{
						key: settings.mouseover_download_key,
						// Clear the chord because keyup might not be called due to the save dialog popup
						clear: true,
						action: { type: "download" }
					},
					{
						key: settings.mouseover_open_new_tab_key,
						// Clear the chord because opening in a new tab will not release the keys
						clear: true,
						action: { type: "open_in_new_tab" }
					},
					{
						key: settings.mouseover_open_bg_tab_key,
						action: { type: "open_in_new_tab", background_tab: true }
					},
					{
						key: settings.mouseover_copy_link_key,
						action: { type: "copy_link" },
						requires: settings.write_to_clipboard
					},
					{
						key: settings.mouseover_open_options_key,
						// Clear the chord because opening in a new tab will not release the keys
						clear: true,
						action: { type: "open_options" }
					},
					{
						key: settings.mouseover_open_orig_page_key,
						// Clear the chord because opening in a new tab will not release the keys
						clear: true,
						action: { type: "open_orig_page" }
					},
					{
						key: settings.mouseover_rotate_left_key,
						action: { type: "rotate_left" }
					},
					{
						key: settings.mouseover_rotate_right_key,
						action: { type: "rotate_right" }
					},
					{
						key: settings.mouseover_flip_horizontal_key,
						action: { type: "flip_horizontal" }
					},
					{
						key: settings.mouseover_flip_vertical_key,
						action: { type: "flip_vertical" }
					},
					{
						key: settings.mouseover_zoom_in_key,
						action: { type: "zoom_in" }
					},
					{
						key: settings.mouseover_zoom_out_key,
						action: { type: "zoom_out" }
					},
					{
						key: settings.mouseover_zoom_full_key,
						action: { type: "zoom_full" }
					},
					{
						key: settings.mouseover_zoom_fit_key,
						action: { type: "zoom_fit" }
					},
					{
						key: settings.mouseover_fullscreen_key,
						action: { type: "fullscreen" }
					},
					{
						key: settings.mouseover_video_seek_left_key,
						action: { type: "seek_left" }
					},
					{
						key: settings.mouseover_video_seek_right_key,
						action: { type: "seek_right" }
					},
					{
						key: settings.mouseover_video_frame_prev_key,
						action: { type: "frame_left" }
					},
					{
						key: settings.mouseover_video_frame_next_key,
						action: { type: "frame_right" }
					},
					{
						key: settings.mouseover_video_speed_down_key,
						action: { type: "speed_down" }
					},
					{
						key: settings.mouseover_video_speed_up_key,
						action: { type: "speed_up" }
					},
					{
						key: settings.mouseover_video_reset_speed_key,
						action: { type: "reset_speed" }
					},
					{
						key: settings.mouseover_video_volume_up_key,
						action: { type: "volume_up" }
					},
					{
						key: settings.mouseover_video_volume_down_key,
						action: { type: "volume_down" }
					},
					{
						key: settings.mouseover_video_mute_key,
						action: { type: "toggle_mute" }
					},
					{
						key: settings.mouseover_video_controls_key,
						action: { type: "toggle_controls" }
					},
					{
						key: settings.mouseover_video_playpause_key,
						action: { type: "toggle_play_pause" }
					},
					{
						key: settings.mouseover_video_screenshot_key,
						// Clear the chord because keyup might not be called due to the save dialog popup
						clear: true,
						action: { type: "screenshot_video" }
					},
					{
						key: settings.mouseover_ui_toggle_key,
						action: { type: "toggle_ui" }
					},
					{
						key: settings.mouseover_gallery_download_key,
						action: { type: "download_gallery" },
						// Clear the chord because keyup might not be called due to the save dialog popup
						clear: true
					},
					{
						key: settings.mouseover_hold_key,
						action: { type: "toggle_hold" }
					}
				];
				for (var i = 0; i < keybinds.length; i++) {
					if (keybinds[i].key && trigger_complete(keybinds[i].key)) {
						if ("requires" in keybinds[i]) {
							if (!keybinds[i].requires)
								continue;
						}
						var action = keybinds[i].action;
						action.needs_popup = true;
						actions.push(action);
						if (keybinds[i].clear)
							clear_chord();
						if (is_popup_active) {
							release_ignore = keybinds[i].key;
							ret = false;
						}
						break;
					}
				}
			}
			if (!release_ignore || !release_ignore.length) {
				release_ignore = [];
			} else {
				release_ignore = deepcopy(release_ignore);
			}
			if (actions && actions.length > 0) {
				clear_chord_wheel();
				for (var i = 0; i < actions.length; i++) {
					action_handler(actions[i]);
				}
				action_remote(actions);
			}
			if (ret === false) {
				event_cache.set(event_cache_key, ret, 5);
			}
			return do_event_return(event, ret);
		};
		var keyup_cb = function(event) {
			if (_nir_debug_) nir_debug("input", "keyup_cb", event);
			if (!mouseover_base_enabled())
				return;
			update_chord(event, false);
			if (!settings.mouseover)
				return;
			var ret = void 0;
			var current_trigger = settings.mouseover_trigger_key;
			if (trigger_id)
				current_trigger = settings["mouseover_trigger_key_t" + trigger_id];
			var condition = event_would_modify_chord(event, false, current_trigger);
			var close_behavior = get_close_behavior();
			if (condition && close_behavior === "all") {
				condition = !trigger_partially_complete(event, current_trigger);
			}
			var can_cancel = popups_active;
			if (!can_cancel) {
				if (settings.mouseover_cancel_popup_when_release ||
					// this probably makes the most sense (#417, thanks to lnp5131 on github for reporting)
					(settings.mouseover_close_need_mouseout && !can_close_popup[1])) {
					can_cancel = true;
				}
			}
			if (condition && close_behavior !== "esc" && popup_trigger_reason === "keyboard" && can_cancel) {
				if (!settings.mouseover_close_need_mouseout || can_close_popup[1]) {
					stop_waiting();
					resetpopups();
				} else {
					can_close_popup[0] = true;
				}
				return;
			}
			// 27 = esc
			if (event.which === 27) {
				if (delay_handle_triggering && popup_trigger_reason === "mouse" && !settings.mouseover_cancel_popup_with_esc)
					return;
				stop_waiting();
				resetpopups();
			}
			if (release_ignore.length > 0) {
				var map = get_keystrs_map(event, false);
				for (var key in map) {
					var index = array_indexof(release_ignore, key);
					if (index >= 0) {
						release_ignore.splice(index, 1);
						ret = false;
					}
				}
			}
			return do_event_return(event, ret);
		};
		function scrollLeft() {
			var doc = document.documentElement;
			var body = document.body;
			return (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
				(doc && doc.clientLeft || body && body.clientLeft || 0);
		}
		function scrollTop() {
			var doc = document.documentElement;
			var body = document.body;
			return (doc && doc.scrollTop || body && body.scrollTop || 0) -
				(doc && doc.clientTop || body && body.clientTop || 0);
		}
		var get_move_with_cursor = function() {
			// don't require this for now, because esc can also be used to close the popup
			//var close_el_policy = get_single_setting("mouseover_close_el_policy");
			// maybe disable if popup position == center, and "move within page" is activated?
			return settings.mouseover_move_with_cursor && !popup_hold; // && close_el_policy === "thumbnail";
		};
		function do_popup_pan(popup, event, mouseX, mouseY) {
			var pan_behavior = get_single_setting("mouseover_pan_behavior");
			var move_with_cursor = get_move_with_cursor();
			if (pan_behavior === "drag" && (event.buttons === 0 || !dragstart) && !move_with_cursor)
				return;
			var viewport = get_viewport();
			var edge_buffer = 40;
			var border_thresh = 20;
			var min_move_amt = parse_int(settings.mouseover_drag_min);
			var moved = false;
			// lefttop: true = top, false = left
			var dodrag = function(lefttop) {
				var orig = parseInt(lefttop ? popup.style.top : popup.style.left);
				var mousepos = lefttop ? mouseY : mouseX;
				var dragoffset = lefttop ? dragoffsetY : dragoffsetX;
				var last = lefttop ? lastY : lastX;
				var current = mousepos - dragoffset;
				if (current !== orig) {
					if (dragged || Math_abs(current - orig) >= min_move_amt) {
						var newlast = current - (orig - last);
						if (lefttop) {
							lastY = newlast;
							popup.style.top = current + "px";
						} else {
							lastX = newlast;
							popup.style.left = current + "px";
						}
						dragged = true;
						moved = true;
					}
				}
			};
			var popup_clientrect = null;
			var popup_media_clientrect = null;
			var domovement = function(lefttop) {
				if (!popup_clientrect) {
					popup_clientrect = get_popup_client_rect();
					popup_media_clientrect = get_popup_media_client_rect();
				}
				// offset* is very slow, slower than setting top/left! 250ms vs 30ms after a while
				//var offsetD = lefttop ? popup.offsetHeight : popup.offsetWidth;
				// offsetD and mediaOffsetD can differ when rotating, because the popup's dimensions don't get updated
				var offsetD = lefttop ? popup_clientrect.height : popup_clientrect.width;
				var mediaOffsetD = lefttop ? popup_media_clientrect.height : popup_media_clientrect.width;
				// the popup is always in the middle, so if the media is rotated, adding the difference in offset allows the position to be accurate
				var offset_add = (mediaOffsetD - offsetD) / 2;
				// mediaOffsetD will usually be smaller than offsetD because of the border
				// if the popup isn't rotated (or 180), we prefer offsetD
				// a proper fix would be nice though, as this only improves the situation for unrotated, which creates inconsistent behavior when rotated
				if (Math_abs(offset_add) < border_thresh) {
					mediaOffsetD = offsetD;
					offset_add = 0;
				}
				var viewportD = lefttop ? viewport[1] : viewport[0];
				var mousepos = lefttop ? mouseY : mouseX;
				if (!settings.mouseover_movement_inverted)
					mousepos = viewportD - mousepos;
				if (mediaOffsetD > viewportD) {
					var mouse_edge = Math_min(Math_max((mousepos - edge_buffer), 0), viewportD - edge_buffer * 2);
					var percent = mouse_edge / (viewportD - (edge_buffer * 2));
					var newpos = (percent * (viewportD - mediaOffsetD - border_thresh * 2) + offset_add + border_thresh) + "px";
					if (lefttop)
						popup.style.top = newpos;
					else
						popup.style.left = newpos;
					moved = true;
				}
			};
			var update_pos_cache = null;
			var domovewith = function(lefttop) {
				var orig = parseInt(lefttop ? popup.style.top : popup.style.left);
				var mousepos = lefttop ? mouseY : mouseX;
				//var popupopen = lefttop ? popupOpenY : popupOpenX;
				var last = lefttop ? popupOpenLastY : popupOpenLastX;
				var current = mousepos - last + orig;
				if (settings.mouseover_move_within_page) {
					if (false) {
						var offsetD = lefttop ? popup.offsetHeight : popup.offsetWidth;
						var viewportD = lefttop ? viewport[1] : viewport[0];
						current = Math_max(current, border_thresh);
						if (current + offsetD > (viewportD - border_thresh)) {
							current = viewportD - border_thresh - offsetD;
						}
					} else if (popup_update_pos_func) {
						if (!update_pos_cache)
							update_pos_cache = popup_update_pos_func(mouseX, mouseY, false);
						current = update_pos_cache[lefttop ? 1 : 0];
					}
				}
				if (current === orig)
					return;
				var newlast = mousepos;
				if (lefttop) {
					popupOpenLastY = newlast;
					popup.style.top = current + "px";
				} else {
					popupOpenLastX = newlast;
					popup.style.left = current + "px";
				}
			};
			if (pan_behavior === "drag" && dragstart) {
				dodrag(false);
				dodrag(true);
			} else if (pan_behavior === "movement") {
				domovement(false);
				domovement(true);
			}
			if (move_with_cursor) {
				// make sure to fix this for remote (this is called at the top frame, but popup_el is remote)
				//var popup_el_rect = popup_el.getBoundingClientRect();
				var popup_el_rect = null;
				// don't check for now, maybe add this as an option later?
				if (true || in_clientrect(mouseX, mouseY, popup_el_rect)) {
					domovewith(false);
					domovewith(true);
				}
			}
			if (moved) {
				mouse_in_image_yet = false;
			}
		}
		var remote_handle_message = function(message, sender, respond) {
			if (_nir_debug_) {
				console_log("ON_REMOTE_MESSAGE", message, sender, respond);
			}
			if (message.type === "make_popup") {
				if (!is_in_iframe) {
					resetpopups();
					deserialize_img(message.data.data.data.img, function(el) {
						message.data.data.data.img = el;
						popup_el_remote = sender;
						popup_el = null;
						real_popup_el = null;
						//console_log("Making popup", message);
						makePopup(message.data.source_imu, message.data.src, message.data.processing, message.data.data);
					});
				}
			} else if (message.type === "count_gallery") {
				count_gallery(message.data.nextprev, message.data.max, message.data.is_counting, void 0, void 0, function(count) {
					respond(count);
				});
			} else if (message.type === "is_nextprev_valid") {
				is_nextprev_valid(message.data.nextprev, function(valid) {
					respond(valid);
				});
			} else if (message.type === "trigger_gallery") {
				trigger_gallery(message.data.dir, function(triggered) {
					respond(triggered);
				});
			} else if (message.type === "resetpopups") {
				resetpopups({
					from_remote: true
				});
			} else if (message.type === "mousemove") {
				// todo: offset iframe location
				mousemove_cb(message.data);
			} else if (message.type === "action") {
				for (var i = 0; i < message.data.length; i++) {
					message.data[i].remote_origin = sender;
					action_handler(message.data[i]);
				}
			} else if (message.type === "popup_open") {
				popup_el_remote = sender;
				last_popup_el = null;
			}
		};
		var handle_remote_event = function(message) {
			if (message.type === "remote") {
				var respond = nullfunc;
				if (message.response_id) {
					var response_id = message.response_id;
					respond = function(data) {
						remote_send_reply(message.from, response_id, data);
					};
				}
				if (message.from === current_frame_id || (message.to && current_frame_id !== message.to)) {
					return true;
				}
				remote_handle_message(message.data, message.from, respond);
				return true;
			} else if (message.type === "remote_reply") {
				if (message.response_id in remote_reply_ids) {
					var response_id = message.response_id;
					delete message.response_id;
					remote_reply_ids[response_id](message.data);
				}
				return true;
			}
			return false;
		};
		if (is_extension) {
			// TODO: move out of do_mouseover
			chrome.runtime.onMessage.addListener(function(message, sender, respond) {
				if (_nir_debug_) {
					console_log("chrome.runtime.onMessage", message);
				}
				if (message.type === "context_imu") {
					// https://github.com/qsniyg/maxurl/issues/517
					// TODO: also set mouse_frame_id in oncontextmenu
					if (mouse_frame_id !== current_frame_id)
						return;
					popup_trigger_reason = "contextmenu";
					trigger_popup({ is_contextmenu: true });
				} else if (message.type === "popupaction") {
					if (message.data.action === "replace_images") {
						replace_images_full();
					} else if (message.data.action === "highlight_images") {
						highlight_images();
					} else if (message.data.action in menucommands_map) {
						menucommands_map[message.data.action].func();
					}
				} else if (message.type === "remote" || message.type === "remote_reply") {
					handle_remote_event(message);
				} else if (message.type === "suspend") {
					set_terminated(true);
				} else if (message.type === "unsuspend") {
					set_terminated(false);
				} else {
					general_extension_message_handler(message, sender, respond);
				}
			});
		} else {
			our_addEventListener(get_window(), "message", function(event) {
				if (_nir_debug_) {
					console_log("window.onMessage", event);
				}
				if (!can_use_remote() || !event.data || typeof event.data !== "object" || !(imu_message_key in event.data))
					return;
				// TODO: update id_to_iframe with event.source (remember that event.source is a window object, not an iframe)
				handle_remote_event(event.data[imu_message_key]);
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
			}, {
				capture: true,
				passive: false
			});
		}
		var last_remote_mousemove = 0;
		var last_remote_mousemove_timer = null;
		var last_remote_mousemove_event = null;
		onload(function() {
			var eventlistener_opts = {
				capture: true,
				passive: false
			};
			our_addEventListener(document, 'keydown', keydown_cb, eventlistener_opts);
			our_addEventListener(document, 'mousedown', keydown_cb, eventlistener_opts);
			our_addEventListener(document, 'contextmenu', keydown_cb, eventlistener_opts);
			our_addEventListener(document.body, 'contextmenu', keydown_cb, eventlistener_opts);
			our_addEventListener(document, 'wheel', keydown_cb, eventlistener_opts);
			our_addEventListener(document, 'keyup', keyup_cb, eventlistener_opts);
			our_addEventListener(document, 'mouseup', keyup_cb, eventlistener_opts);
			our_addEventListener(document, 'contextmenu', update_contextmenu_pos);
			var wheel_cb = function(event) {
				if (settings.scroll_override_page && popups_active && popup_wheel_cb) {
					return popup_wheel_cb(event, true);
				}
			};
			our_addEventListener(document, "wheel", wheel_cb, { passive: false });
			// https://github.com/qsniyg/maxurl/issues/771
			// seems to be a bug in chrome. if both a "wheel" and a "mousewheel" (deprecated) event are set on document, it will not fire the mousewheel event
			if (host_domain_nosub === "bilibili.com" && navigator.userAgent.indexOf("Chrome/") >= 0) {
				our_addEventListener(document, "wheel", function(e) {
					var ev = document.createEvent("MouseEvents");
					ev.initEvent("mousewheel", true, true);
					//ev.originalEvent = e.originalEvent || e;
					ev.wheelDelta = e.wheelDelta;
					ev.detail = e.detail;
					ev.deltaMode = e.deltaMode;
					ev.target = e.target;
					ev.srcElement = e.srcElement;
					document.dispatchEvent(ev);
				});
			}
		});
		var update_mouse_from_event = function(event) {
			if (event.pageX === null && event.clientX !== null) {
				// commenting out because unused and sets global variables
				/*eventDoc = (event.target && event.target.ownerDocument) || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;*/
				event.pageX = event.clientX + scrollLeft();
				event.pageY = event.clientY + scrollTop();
			}
			if (can_use_remote()) {
				if (event.remote_info && event.remote_info.id !== current_frame_id) {
					var iframe = find_iframe_for_info(event.remote_info);
					if (!iframe) {
						return;
					}
					//console_log(iframe);
					var bb = get_bounding_client_rect(iframe);
					// fixme: should this be done?
					event.clientX += bb.left;
					event.clientY += bb.top;
					event.pageX += bb.left + window.scrollX;
					event.pageY += bb.top + window.scrollY;
				} else if (is_in_iframe) {
					// todo: add timeouts to avoid too much cpu usage
					last_remote_mousemove_event = event;
					var mindelta = 16;
					if (!settings.mouseover_use_remote) {
						mindelta = 300; // we don't need precise movements, all we need is to inform the top frame that the mouse is here
					}
					var current_time = Date.now();
					var timeout = mindelta - (current_time - last_remote_mousemove);
					if (timeout < 1)
						timeout = 1;
					if (!last_remote_mousemove_timer) {
						last_remote_mousemove_timer = setTimeout(function() {
							if (!("remote_info" in last_remote_mousemove_event)) {
								last_remote_mousemove_event.remote_info = get_frame_info();
							}
							last_remote_mousemove_timer = null;
							last_remote_mousemove = Date.now();
							remote_send_message("top", {
								type: "mousemove",
								data: serialize_event(last_remote_mousemove_event)
							});
						}, timeout);
					}
				}
				mouse_frame_id = event.remote_info ? event.remote_info.id : current_frame_id;
			}
			mouseX = event.clientX;
			mouseY = event.clientY;
			mouseAbsX = event.pageX;
			mouseAbsY = event.pageY;
		};
		var mousemove_cb = function(event) {
			mousepos_initialized = true;
			// https://stackoverflow.com/a/7790764
			event = event || window.event;
			update_mouse_from_event(event);
			if (waiting) {
				update_waiting();
			}
			if (popups_active) {
				do_popup_pan(popups[0], event, mouseX, mouseY);
			}
			var jitter_base = settings.mouseover_jitter_threshold;
			var do_mouse_close_kbd = popup_trigger_reason === "keyboard" && get_close_need_mouseout() && popups_active;
			var do_mouse_close_mouse = popup_trigger_reason === "mouse";
			if (do_mouse_close_kbd || do_mouse_close_mouse) {
				if (popups_active) {
					// FIXME: why was this not in if (popups_active)?
					// The reason for putting it here is that if the mouse moves (even within jitter thresh) after a single popup is open, it will cancel the popup request
					if (delay_handle) {
						clearTimeout(delay_handle);
						delay_handle = null;
						if (false && waiting)
							stop_waiting();
					}
					var jitter_threshx = 40;
					var jitter_threshy = jitter_threshx;
					//var img = popups[0].getElementsByTagName("img")[0];
					var img = get_popup_media_el();
					var imgmiddleX = null;
					var imgmiddleY = null;
					var in_img_jitter = false;
					if (img) {
						var rect = get_popup_media_client_rect();
						in_img_jitter = in_clientrect(mouseX, mouseY, rect, jitter_base);
						var w = rect.width;
						var h = rect.height;
						imgmiddleX = rect.x + rect.width / 2;
						imgmiddleY = rect.y + rect.height / 2;
						jitter_threshx = Math_max(jitter_threshx, w / 2);
						jitter_threshy = Math_max(jitter_threshy, h / 2);
						jitter_threshx += jitter_base;
						jitter_threshy += jitter_base;
						/*console_log(jitter_threshx, img.naturalWidth, w);
						console_log(jitter_threshy, img.naturalHeight, h);*/
						if (mouse_in_image_yet === false) {
							if (in_clientrect(mouseX, mouseY, rect)) {
								mouse_in_image_yet = true;
							}
						}
					}
					var do_mouse_reset = function() {
						if (popup_hold) {
							can_close_popup[1] = true;
						} else {
							resetpopups();
						}
					};
					var close_el_policy = get_single_setting("mouseover_close_el_policy");
					var close_on_leave_el = (close_el_policy === "thumbnail" || close_el_policy === "both") && popup_el && !popup_el_automatic;
					var outside_of_popup_el = false;
					var popup_el_hidden = false;
					// check if we should check if the mouse has left popup_el (the source/thumbnail that was popped up from, _not_ the element of the popup)
					if (close_on_leave_el) {
						var popup_el_rect = get_bounding_client_rect(popup_el);
						// check if the source element is visible
						if (popup_el_rect && popup_el_rect.width > 0 && popup_el_rect.height > 0) {
							var our_in_img_jitter = in_img_jitter;
							if (close_el_policy === "thumbnail")
								our_in_img_jitter = false; // if not "both", we don't care if the mouse is still in the popup, only if it has left the thumbnail
							if (!in_clientrect(mouseX, mouseY, popup_el_rect) && !our_in_img_jitter) {
								outside_of_popup_el = true;
								if (close_el_policy === "thumbnail") {
									return do_mouse_reset();
								}
							}
						} else {
							// the element must be hidden
							popup_el_hidden = true;
						}
					}
					can_close_popup[1] = false;
					if (mouse_in_image_yet && (!close_on_leave_el || outside_of_popup_el || popup_el_hidden)) {
						if (imgmiddleX && imgmiddleY &&
							(Math_abs(mouseX - imgmiddleX) > jitter_threshx ||
								Math_abs(mouseY - imgmiddleY) > jitter_threshy)) {
							//console_log(mouseX, imgmiddleX, jitter_threshx);
							//console_log(mouseY, imgmiddleY, jitter_threshy);
							do_mouse_reset();
						}
					} else if (close_on_leave_el) {
						if (outside_of_popup_el) {
							do_mouse_reset();
						}
					}
				} else if (do_mouse_close_mouse && delay_handle_triggering) {
					if (next_popup_el && settings.mouseover_cancel_popup_when_elout) {
						var popup_el_rect = get_bounding_client_rect(next_popup_el);
						if (!in_clientrect(mouseX, mouseY, popup_el_rect)) {
							resetpopups();
						}
					}
				}
			}
			if (mouseover_mouse_enabled()) {
				// FIXME: this is rather weird. Less CPU usage, but doesn't behave in the way one would expect
				if ((!popups_active || popup_el_automatic) && !should_exclude_imagetab()) {
					if (delay_handle && !settings.mouseover_trigger_mouseover) {
						var trigger_mouse_jitter_thresh = 10;
						if (Math_abs(mouseX - mouseDelayX) < trigger_mouse_jitter_thresh &&
							Math_abs(mouseY - mouseDelayY) < trigger_mouse_jitter_thresh)
							return;
						clearTimeout(delay_handle);
						delay_handle = null;
					}
					mouseDelayX = mouseX;
					mouseDelayY = mouseY;
					//mouse_in_image_yet = false;
					if (last_popup_el) {
						var popup_el_rect = get_bounding_client_rect(last_popup_el);
						if (!in_clientrect(mouseX, mouseY, popup_el_rect)) {
							last_popup_el = null;
						}
					}
					if (!settings.mouseover_trigger_mouseover) {
						delay_handle = setTimeout(function() {
							if (!popup_mouse_head())
								return;
							trigger_popup();
						}, delay * 1000);
					}
				}
			}
		};
		onload(function() { return our_addEventListener(document, 'mousemove', mousemove_cb); });
		(function() {
			register_menucommand("Report issue", github_issues_page);
		})();
	}