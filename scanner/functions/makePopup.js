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