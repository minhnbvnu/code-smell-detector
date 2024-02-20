function write_file(cfb, filename, options) {
	get_fs();
	var o = _write(cfb, options);
fs.writeFileSync(filename, o);
}