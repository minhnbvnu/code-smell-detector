function TPKT(transport) {
	this.transport = transport;
	// wait 2 bytes
	this.transport.expect(2);
	// next state is receive header
	var self = this;
	this.transport.once('data', function(s) {
		self.recvHeader(s);
	}).on('close', function() {
		self.emit('close');
	}).on('error', function (err) {
		self.emit('error', err);
	});
}