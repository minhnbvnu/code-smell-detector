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