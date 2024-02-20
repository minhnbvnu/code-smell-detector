function BufferLayer(socket) {
	//for ssl connection
	this.securePair = null;
	this.socket = socket;

	var self = this;
	// bind event
	this.socket.on('data', function(data) {
		try {
			self.recv(data);
		}
		catch(e) {
			self.socket.destroy();
			self.emit('error', e);
		}
	}).on('close', function() {
		self.emit('close');
	}).on('error', function (err) {
		self.emit('error', err);
	});

	//buffer data
	this.buffers = [];
	this.bufferLength = 0;
	//expected size
	this.expectedSize = 0;
}