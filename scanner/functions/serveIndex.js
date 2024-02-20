function serveIndex (req, res) {
	res.end(fs.readFileSync(path.resolve(__dirname, 'exploit/index.html')));
}