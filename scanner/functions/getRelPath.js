function getRelPath(file, ctx) {
	if (!file) { return ""; }
	// this expects a url format like: 'blob:/blob-1/filepath/etc/filename.ext
	let o = /:\/.+?\/(.+)$/.exec(file.url || "");
	if (!o || !o[1]) {
		ctx && ctx.log.note(`Unable to parse relative path from URL ('${file.url}')`);
		return file.name;
	}
	return o[1]
}