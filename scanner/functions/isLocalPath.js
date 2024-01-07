function isLocalPath(source) {
	  return typeof source === 'string' && source.substr(0, 7) === 'file://';
	}