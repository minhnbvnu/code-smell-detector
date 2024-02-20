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