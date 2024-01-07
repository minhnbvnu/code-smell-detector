function getQueryParams(queryString) {
	  var params = {};
	  queryString.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g, function (s) {
	    for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      t[_key - 1] = arguments[_key];
	    }

	    decodeParam(params, t[0], t[1]);
	    return t.join('=');
	  });
	  return params;
	}