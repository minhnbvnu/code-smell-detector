function stripTail(str) {
	  var arr = str.match(/(.+)(-[^-]+)$/);
	  var st = '';
	  if (arr && arr.length === 3) {
	    st = arr[1];
	  }
	  return st;
	}