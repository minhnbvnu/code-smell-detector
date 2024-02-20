function mtimeSync(fname) {
	return fs.existsSync(fname) ? fs.statSync(fname).mtime : 0;
}