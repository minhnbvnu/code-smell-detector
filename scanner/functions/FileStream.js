function FileStream(fileName) {
	var data = fs.readFileSync(fileName, "utf8");
	InputStream.call(this, data);
	this.fileName = fileName;
	return this;
}