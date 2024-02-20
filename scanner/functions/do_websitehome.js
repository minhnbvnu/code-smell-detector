function do_websitehome() {
		if (require_rules_failed)
			return;
		unsafeWindow["imu_variable"] = bigimage_recursive;
		unsafeWindow["imu_inject"] = 1;
		unsafeWindow["do_imu"] = function(url, cb) {
			return bigimage_recursive(url, {
				fill_object: true,
				do_request: do_request,
				cb: cb
			});
		};
		var orig_set_max = unsafeWindow["set_max"];
		unsafeWindow["set_max"] = function(obj) {
			if (!obj || !obj[0].url) {
				orig_set_max(obj);
				return;
			}
			var loop_url = function(obj, cb, options, lasturl) {
				check_image_get(obj, function(img, newurl) {
					var finalurl = newurl;
					if (!newurl && img && img.finalUrl) {
						finalurl = img.finalUrl;
					}
					if (!finalurl) {
						cb(img, newurl);
						return;
					}
					if (obj_indexOf(obj, finalurl) < 0 &&
						lasturl !== finalurl) {
						bigimage_recursive(finalurl, {
							fill_object: true,
							do_request: do_request,
							cb: function(obj) {
								check_image_unref(img);
								loop_url(obj, cb, options, finalurl);
							}
						});
					} else {
						cb(img, newurl, obj[obj_indexOf(obj, finalurl)]);
					}
				}, options);
			};
			if (settings.website_image) {
				loop_url(obj, function(img, url, obj) {
					if (!img) {
						orig_set_max("broken");
					} else {
						var newobj = obj;
						if (!newobj)
							newobj = { url: url };
						orig_set_max([newobj]);
						unsafeWindow["maximgel"].src = img.src;
					}
				}, { running: true });
			} else if (obj.can_head) {
				loop_url(obj, function(resp) {
					if (!resp) {
						orig_set_max("broken");
					} else {
						var newobj = obj;
						if (!newobj)
							newobj = { url: resp.finalUrl };
						orig_set_max([newobj]);
					}
				}, { running: true, head: true });
			} else {
				orig_set_max(obj);
			}
		};
	}