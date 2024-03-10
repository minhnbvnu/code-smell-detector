			var ffmpeg_mux_single = function(ffmpeg, video_file, audio_file, out_filename, progress, success, fail) {
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
		function count_gallery(nextprev, max, is_counting, origel, el, cb) {
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
									do_blob_download(blob, out_filename, function() {
										ffmpeg.FS("unlink", filename);
									});
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