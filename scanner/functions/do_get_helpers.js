function do_get_helpers(options) {
			var baseoptions = {
				document: document,
				window: get_window(),
				host_url: window.location.href,
				do_request: do_request,
				rule_specific: {}
			};
			for (var option in options) {
				baseoptions[option] = options[option];
			}
			return get_helpers(baseoptions);
		}