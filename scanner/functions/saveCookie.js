function saveCookie (keys, opts) {
		var
			o		= $.extend( {}, options.cookie, opts || {} )
		,	name	= o.name || options.name || "Layout"
		,	params	= ''
		,	date	= ''
		,	clear	= false
		;
		if (o.expires.toUTCString)
			date = o.expires;
		else if (typeof o.expires == 'number') {
			date = new Date();
			if (o.expires > 0)
				date.setDate(date.getDate() + o.expires);
			else {
				date.setYear(1970);
				clear = true;
			}
		}
		if (date)		params += ';expires='+ date.toUTCString();
		if (o.path)		params += ';path='+ o.path;
		if (o.domain)	params += ';domain='+ o.domain;
		if (o.secure)	params += ';secure';

		if (clear) {
			state.cookie = {}; // clear data
			document.cookie = name +'='+ params; // expire the cookie
		}
		else {
			state.cookie = getState(keys || o.keys); // read current panes-state
			document.cookie = name +'='+ encodeURIComponent( encodeJSON(state.cookie) ) + params; // write cookie
		}

		return $.extend({}, state.cookie); // return COPY of state.cookie
	}