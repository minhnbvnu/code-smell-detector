function base64clean$1(str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim$1(str).replace(INVALID_BASE64_RE$1, ''); // Node converts strings with length < 2 to ''

	  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }

	  return str;
	}