function decodeQueryParam(param) {
  		return decodeURIComponent(param.replace(/\+/g, "%20"));
  	}