function canCompile(filename, altExts) {
	  var exts = altExts || canCompile.EXTENSIONS;
	  var ext = _path2.default.extname(filename);
	  return (0, _includes2.default)(exts, ext);
	}