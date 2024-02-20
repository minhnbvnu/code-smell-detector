function delCache(path) {
	fs.readdirSync(path).forEach(function(name) {
		var p = fsp.join(path, name);
		if (fs.statSync(p).isDirectory()) delCache(p);
		else fs.unlinkSync(p);
	});
	fs.rmdirSync(path);
}