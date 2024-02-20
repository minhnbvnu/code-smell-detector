function get_values(keys, cb) {
		if (is_extension) {
			extension_send_message({
				type: "getvalue",
				data: keys
			}, function(response) {
				response = response.data;
				obj_foreach(response, function(key, value) {
					response[key] = parse_value(value);
				});
				cb(response);
			});
		} else if (typeof GM_getValue !== "undefined" &&
			// Unfortunately FireMonkey currently implements GM_getValue as a mapping to GM.getValue for some reason
			//   https://github.com/erosman/support/issues/98
			// Until this is fixed, we cannot use GM_getValue for FireMonkey
			userscript_manager !== "FireMonkey") {
			var response = {};
			array_foreach(keys, function(key) {
				response[key] = parse_value(gm_getvalue_wrap(key));
			});
			return cb(response);
		} else if (typeof GM !== "undefined" && GM.getValue) {
			var total_keys = 0;
			var response = {};
			array_foreach(keys, function(key) {
				GM.getValue(key, void 0).then(function(value) {
					response[key] = parse_value(value);
					if (++total_keys >= keys.length) {
						cb(response);
					}
				}, function(error) {
					console_error(error);
					if (++total_keys >= keys.length) {
						cb(response);
					}
				});
			});
		} else {
			cb({});
		}
	}