function getHTMLDir(dir) {
	  !isStrong(dir) ?  true ? invariant(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
	  return dir === LTR ? 'ltr' : 'rtl';
	}