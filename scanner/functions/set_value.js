function set_value(key, value, cb) {
		if (key in settings_meta && settings_meta[key].onedit) {
			settings_meta[key].onedit(value);
		}
		value = serialize_value(value);
		//console_log("Setting " + key + " = " + value);
		if (is_extension) {
			var kv = {};
			kv[key] = value;
			//chrome.storage.sync.set(kv, function() {});
			updating_options++;
			extension_send_message({
				type: "setvalue",
				data: kv
			}, function() {
				updating_options--;
				cb && cb();
			});
		} else if (typeof GM_setValue !== "undefined") {
			GM_setValue(key, value);
			cb && cb();
		} else if (typeof GM !== "undefined" && GM.setValue) {
			GM.setValue(key, value).then(function() {
				cb && cb();
			});
		} else {
			cb && cb();
		}
	}