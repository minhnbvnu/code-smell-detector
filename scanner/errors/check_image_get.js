function check_image_get(obj, cb, processing) {
		if (_nir_debug_) nir_debug("check_image_get", "check_image_get", deepcopy(obj), cb, deepcopy(processing));
		if (!obj || !obj[0] || !obj[0].url) {
			return cb(null);
		}
		if (!processing.running) {
			return cb(null);
		}
		var err_cb_real = function(_no_propagate) {
			revoke_objecturl(last_objecturl);
			obj.shift();
			if (_nir_debug_) nir_debug("check_image_get", "check_image_get(err_cb):", obj, processing);
			return check_image_get(obj, cb, processing);
		};
		var err_cb = err_cb_real;
		if (processing.set_cache || processing.use_cache) {
			if (!check_image_cache) {
				var maximum_items = settings.popup_cache_itemlimit;
				if (maximum_items <= 0)
					maximum_items = null;
				check_image_cache = new IMUCache({
					max_keys: maximum_items,
					destructor: function(key, value) {
						if (value && value.img)
							check_image_unref(value.img);
					}
				});
			}
		}
		// this happens for waiting: true images, such as private Flickr images (thanks to fireattack for reporting)
		// FIXME: a better fix would be to always fillobj, including for waiting: true
		if (!obj[0].media_info) {
			console_warn("No media info", obj[0]);
			obj[0].media_info = deepcopy(default_object.media_info);
			//return err_cb();
		}
		// do this before cache, in case settings change
		if (!is_media_type_supported(obj[0].media_info, processing)) {
			console_warn("Media type", obj[0].media_info, "is not supported");
			return err_cb();
		}
		if (processing.use_cache) {
			if (check_image_cache.has(obj[0].url)) {
				var cached_result = check_image_cache.get(obj[0].url);
				if (_nir_debug_) nir_debug("check_image_get", "check_image_get(cached):", cached_result.img, cached_result.resp, obj[0]);
				var img = cached_result.img;
				var destroyed = false;
				if (img) {
					if ((img.tagName === "VIDEO" || img.tagName === "AUDIO") && !settings.popup_cache_resume_video) {
						img.currentTime = cached_result.currentTime || 0;
					}
					if (img.hasAttribute("imu-destroyed"))
						destroyed = true;
				}
				if (!destroyed) {
					if (cached_result.filesize && !obj[0].filesize) {
						obj[0].filesize = cached_result.filesize;
					}
					if (processing.head) {
						cb(cached_result.resp, obj[0]);
					} else {
						cb(cached_result.img, cached_result.resp.finalUrl, obj[0], cached_result.resp);
					}
					return;
				}
			}
		}
		var method = "GET";
		var responseType = "blob";
		var last_objecturl = null;
		var obj_is_probably_video = is_probably_video(obj[0]);
		var obj_is_probably_stream = is_probably_stream(obj[0]);
		var incomplete_request = false;
		if (processing.incomplete_image || (obj_is_probably_stream && processing.incomplete_video) || processing.head)
			incomplete_request = true;
		if (obj[0].need_blob || obj[0].need_data_url)
			incomplete_request = false;
		if (obj_is_probably_stream && !obj[0].media_info.delivery) {
			obj[0].media_info.delivery = get_delivery_from_url(obj[0].url);
		}
		if (processing.head || incomplete_request) {
			if (incomplete_request && !obj[0].can_head) {
				method = "GET";
			} else {
				method = "HEAD";
			}
			responseType = void 0;
		}
		if (obj[0].url.match(/^data:/) && !obj[0].media_info.delivery) {
			var img = document_createElement("img");
			set_common_el_properties(img, obj[0]);
			img.src = obj[0].url;
			img.onload = function() {
				cb(img, obj[0].url, obj[0]);
			};
			img.onerror = function(e) {
				console_log("Error loading image", e);
				err_cb();
			};
			return;
		}
		var run_cbs = function(our_this, args, no_propagate) {
			if (no_propagate) {
				return final_cb.apply(our_this, args);
			}
			//console_log("Running cbs for", our_this, args, cb_key);
			var cbs = check_image_cbs[cb_key];
			if (!cbs) {
				console_error("Already ran cbs?", our_this, args, cb_key);
				return;
			}
			delete check_image_cbs[cb_key];
			array_foreach(cbs, function(cb) {
				cb(our_this, args);
			});
		};
		var final_cb = cb;
		var url = obj[0].url;
		console_log("Trying " + url);
		// commenting out because allow_video is no longer in settings
		/*if (false) {
			var video_allowed = settings.allow_video && !processing.deny_video;

			if (obj[0] && obj[0].media_info.type === "video") {
				if (!video_allowed) {
					console_log("Video, skipping due to user setting");
					return err_cb();
				}
			}
		}*/
		if (obj[0].url && /^blob:/.test(obj[0].url)) {
			console_log("Blob URL");
			return err_cb();
		}
		if (obj[0].bad) {
			console_log("Bad image");
			return err_cb();
		}
		if (obj[0].is_pagelink) {
			console_log("Page link");
			return err_cb();
		}
		if (is_invalid_url(obj[0].url)) {
			console_log("Invalid URL");
			return err_cb();
		}
		var url_domain = url.replace(/^([a-z]+:\/\/[^/]*).*?$/, "$1");
		var headers = obj[0].headers;
		if (!headers || Object.keys(headers).length === 0) {
			var referer_host = window.location.href;
			if (!/^https?:\/\//.test(referer_host)) // e.g. file://
				referer_host = "";
			headers = {
				//"Origin": url_domain,
				"Referer": referer_host
			};
		} else if (!headers.Origin && !headers.origin) {
			//headers.Origin = url_domain;
		}
		var handled = false;
		var onload_cb = function(resp) {
			if (handled) {
				return;
			}
			handled = true;
			if (!processing.running) {
				return final_cb(null);
			}
			if (false && resp.readyState !== 4)
				return;
			if (_nir_debug_) nir_debug("check_image_get", "check_image_get(onload)", deepcopy(resp), resp.readyState);
			var digit = resp.status.toString()[0];
			var ok_error = check_ok_error(obj[0].head_ok_errors, resp.status);
			if ((digit === "4" || digit === "5") &&
				resp.status !== 405 && ok_error !== true) {
				if (err_cb) {
					console_log("Bad status: " + resp.status + " ( " + url + " )");
					err_cb();
				} else {
					console_error("Error: " + resp.status);
				}
				return;
			}
			if (check_bad_if(obj[0].bad_if, resp)) {
				console_log("Bad image (bad_if)", resp, obj[0].bad_if);
				return err_cb();
			}
			if (processing.head) {
				final_cb(resp, obj[0]);
				return;
			}
			var parsed_headers = headers_list_to_dict(parse_headers(resp.responseHeaders));
			var media_info = obj[0].media_info;
			// TODO: improve
			if (media_info.type === "image" && parsed_headers["content-type"]) {
				var detected_mediainfo = get_mediainfo_from_contenttype(parsed_headers["content-type"]);
				if (detected_mediainfo) {
					media_info.type = detected_mediainfo.type;
					if (detected_mediainfo.delivery)
						media_info.delivery = detected_mediainfo.delivery;
				}
			}
			if (false) {
				// commenting out because video_allowed doesn't exist
				/*if (media_info.type === "video" && !video_allowed) {
					console_log("Video, skipping due to user setting");
					return err_cb();
				}*/
			}
			if (!is_media_type_supported(media_info, processing)) {
				console_warn("Media type", media_info, "is not supported");
				return err_cb();
			}
			if (settings.mouseover_matching_media_types && processing && processing.source && processing.source.el) {
				var source_mediatype = el_media_type(processing.source.el);
				if (source_mediatype) {
					if (source_mediatype !== media_info.type) {
						console_log("Source was ", source_mediatype, ", this is", media_info.type, "skipping");
						return err_cb();
					}
				}
			}
			var good_cb = function(img) {
				if (_nir_debug_) nir_debug("check_image_get", "check_image_get(good_cb):", img, resp.finalUrl, obj[0], resp);
				if (processing.set_cache) {
					var cache_obj = {
						img: img,
						resp: resp,
						filesize: obj[0].filesize
					};
					if (img.tagName === "VIDEO" || img.tagName === "AUDIO")
						cache_obj.currentTime = img.currentTime;
					check_image_cache.set(obj[0].url, cache_obj, (parseFloat(settings.popup_cache_duration) || 0) * 60);
				}
				if (img)
					check_image_ref(img);
				final_cb(img, resp.finalUrl, obj[0], resp);
			};
			if (parsed_headers["content-length"] && parseInt(parsed_headers["content-length"]) > 100) {
				obj[0].filesize = parseInt(parsed_headers["content-length"]);
			}
			var set_src = function(el, src) {
				var delivery = media_info.delivery + "";
				if (media_info.type !== "image" && !processing.deny_nondirect_delivery && delivery in mediadelivery_support) {
					var module = mediadelivery_support[delivery];
					if (module.active()) {
						module.el_init({
							success: function() { }, // todo?
							fail: err_cb,
							info_obj: obj[0],
							el: el,
							src: src
						});
						return;
					}
				} else {
					set_direct_src(el, src, obj[0]);
				}
			};
			var create_media = function(src, mediatype) {
				var our_err_cb = err_cb;
				// https://github.com/qsniyg/maxurl/issues/672
				if (!mediatype && obj[0].head_wrong_contenttype && media_info.type !== "audio") {
					our_err_cb = function() {
						var all_mediatypes = ["video", "image"];
						all_mediatypes.splice(array_indexof(all_mediatypes, media_info.type), 1);
						create_media(src, all_mediatypes[0]);
					};
				}
				if (!mediatype)
					mediatype = media_info.type;
				var el = create_media_el(obj[0], mediatype, processing, good_cb, our_err_cb);
				set_src(el, src);
				return el;
			};
			if (incomplete_request) {
				create_media(resp.finalUrl);
				return;
			}
			if (!resp.response) {
				err_cb();
				return;
			}
			var loadcb = function(urldata) {
				if (_nir_debug_) {
					console_log("check_image_get's loadcb", urldata, media_info);
				}
				last_objecturl = urldata;
				if (!urldata) {
					return err_cb();
				}
				create_media(urldata);
			};
			if (obj[0].need_data_url || (!settings.mouseover_use_blob_over_data && !obj[0].need_blob)) {
				create_dataurl(resp.response, loadcb);
			} else {
				var objecturl = create_objecturl(resp.response);
				loadcb(objecturl);
			}
		};
		var req = null;
		if ((!obj[0].can_multiple_request || settings.mouseover_partial_avoid_head) && incomplete_request
			&& (!obj[0].bad_if || obj[0].bad_if.length === 0)) {
			onload_cb({
				status: 200,
				responseHeaders: "Content-Type: " + (obj_is_probably_video ? "video/mp4" : "image/jpeg"),
				readyState: 3,
				finalUrl: obj[0].url
			});
			return;
		}
		var cb_key = method + " " + incomplete_request + " " + url;
		//console_log(cb_key);
		err_cb = function(no_propagate) {
			run_cbs(null, null, no_propagate);
		};
		final_cb = function() {
			run_cbs(this, arguments);
		};
		if (!(cb_key in check_image_cbs))
			check_image_cbs[cb_key] = [];
		check_image_cbs[cb_key].push(function(our_this, args) {
			if (!args && !our_this) {
				return err_cb_real();
			}
			return cb.apply(our_this, args);
		});
		// avoid multiple requests to the same image at the same time (e.g. for replace images)
		if (check_image_cbs[cb_key].length > 1)
			return;
		var start_req = function() {
			req = do_request({
				method: method,
				url: url,
				responseType: responseType,
				headers: headers,
				trackingprotection_failsafe: true,
				need_blob_response: method == "GET",
				retry_503: true,
				onprogress: function(resp) {
					var do_abort = function() {
						if (!req || !req.abort) {
							console_warn("Unable to abort request");
							return;
						}
						req.abort();
					};
					if (!processing.running) {
						do_abort();
					}
					if (processing.progress_cb && resp.lengthComputable && resp.loaded && resp.total) {
						processing.progress_cb({
							total: resp.total,
							loaded: resp.loaded
						});
					}
					if (incomplete_request && resp.readyState >= 2 && resp.responseHeaders) {
						do_abort();
						onload_cb(resp);
					}
				},
				onload: onload_cb
			});
		};
		if (obj[0].cookie_url && get_cookies) {
			get_cookies(obj[0].cookie_url, function(cookies) {
				if (!cookies) {
					return start_req();
				}
				headerobj_set(headers, "cookie", cookies_to_httpheader(cookies));
				start_req();
			}, { need_full: true });
		} else {
			start_req();
		}
	}