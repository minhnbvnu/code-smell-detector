function get_cookies(url, cb, options) {
	if (!options) options = {};

	var end = function (store) {
		var base_options = { url: url };
		if (store) base_options.storeId = store;

		var new_options = JSON.parse(JSON.stringify(base_options));
		new_options.firstPartyDomain = null;

		var endcb = function(cookies) {
			debug("get_cookies: " + url, cookies, store);
			cb(JSON.parse(JSON.stringify(cookies)));
		};

		try {
			chrome.cookies.getAll(new_options, endcb);
		} catch (e) {
			try {
				chrome.cookies.getAll(base_options, endcb);
			} catch (e) {
				console.error(e);
				cb(null);
			}
		}
	};

	if (!options.store) {
		var tabid = options.tabid;
		if (tabid === background_userscript_tabid) tabid = null;

		// TODO: cache
		try {
			chrome.cookies.getAllCookieStores(function (stores) {
				var store = null;
				for (var i = 0; i < stores.length; i++) {
					if ((tabid && stores[i].tabIds.indexOf(tabid) >= 0) || !tabid) {
						store = stores[i].id;
						break;
					}
				}

				if (store) {
					return end(store);
				} else {
					return end();
				}
			});
		} catch (e) {
			console.error(e);
			end();
		}
	} else {
		end(options.store);
	}
}