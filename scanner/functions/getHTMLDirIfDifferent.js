function getHTMLDirIfDifferent(dir, otherDir) {
	  !isStrong(dir) ?  true ? invariant(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
	  !isStrong(otherDir) ?  true ? invariant(false, '`otherDir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
	  return dir === otherDir ? null : getHTMLDir(dir);
	}