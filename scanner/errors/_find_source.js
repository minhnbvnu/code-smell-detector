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