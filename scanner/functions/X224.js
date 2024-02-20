function X224(transport) {
	this.transport = transport;
	this.requestedProtocol = Protocols.PROTOCOL_SSL;
	this.selectedProtocol = Protocols.PROTOCOL_SSL;
	
	var self = this;
	this.transport.on('close', function() {
		self.emit('close');
	}).on('error', function (err) {
		self.emit('error', err);
	});
}