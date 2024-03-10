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