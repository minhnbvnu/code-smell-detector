function Global(transport, fastPathTransport) {
	this.transport = transport;
	this.fastPathTransport = fastPathTransport;
	// must be init via connect event
	this.userId = 0;
	this.serverCapabilities = [];
	this.clientCapabilities = [];
}