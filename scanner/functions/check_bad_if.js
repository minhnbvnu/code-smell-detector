function check_bad_if(badif, resp) {
		if (_nir_debug_)
			console_log("check_bad_if", badif, resp);
		if (!badif || !is_array(badif) || badif.length === 0) {
			if (_nir_debug_)
				console_log("check_bad_if (!badif)");
			return false;
		}
		var headers = parse_headers(resp.responseHeaders);
		var check_single_badif = function(badif) {
			if (badif.headers) {
				for (var header in badif.headers) {
					var header_lower = header.toLowerCase();
					var found = false;
					for (var i = 0; i < headers.length; i++) {
						if (headers[i].name.toLowerCase() === header_lower) {
							if (typeof (badif.headers[header]) === "function") {
								found = badif.headers[header](headers[i].value);
							} else if (typeof (badif.headers[header]) === "string") {
								found = headers[i].value === badif.headers[header];
							}
							if (found) {
								break;
							} else {
								return false;
							}
						}
					}
					if (!found)
						return false;
				}
			}
			return true;
		};
		for (var j = 0; j < badif.length; j++) {
			if (check_single_badif(badif[j]))
				return true;
		}
		return false;
	}