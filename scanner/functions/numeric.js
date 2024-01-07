function numeric(str) {
	  return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
	}