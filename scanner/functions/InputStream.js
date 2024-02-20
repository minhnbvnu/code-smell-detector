function InputStream() {
	this.data = '';
	this.start = 0;
	this.committed = 0;
	this.eof = false;
	this.lastLocation = {line: 0, column: 0};
}