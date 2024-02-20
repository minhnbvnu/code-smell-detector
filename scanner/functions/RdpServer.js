function RdpServer(config, socket) {
	if (!(config.key && config.cert)) {
		throw new error.FatalError('NODE_RDP_PROTOCOL_RDP_SERVER_CONFIG_MISSING', 'missing cryptographic tools')
	}
	this.connected = false;
	this.bufferLayer = new layer.BufferLayer(socket);
	this.tpkt = new TPKT(this.bufferLayer);
	this.x224 = new x224.Server(this.tpkt, config.key, config.cert);
	this.mcs = new t125.mcs.Server(this.x224);
}