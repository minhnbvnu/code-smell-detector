function read_file(filename, options) {
	get_fs();
	return parse(fs.readFileSync(filename), options);
}