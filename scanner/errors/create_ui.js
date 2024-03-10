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