function noParseList() {
	var list = [];
	function scan(dir) {
		fs.readdirSync(dir).forEach(function(name) {
			var sub = fsp.join(dir, name);
			if (name === 'babylon') list.push(fsp.join(sub, 'index.js'));
			else if (fs.lstatSync(sub).isDirectory()) scan(sub);
		});
	}
	scan(__dirname);
	return list;
}