function Sec(transport, fastPathTransport) {
	this.transport = transport;
	this.fastPathTransport = fastPathTransport;
	// init at connect event from transport layer
	this.gccClient = null;
	this.gccServer = null;
	var self = this;
	this.infos = rdpInfos(function() {
		return self.gccClient.core.rdpVersion.value === gcc.VERSION.RDP_VERSION_5_PLUS;
	});
	this.machineName = '';
	
	
	// basic encryption
	this.enableEncryption = false;
	
	if (this.fastPathTransport) {
		this.fastPathTransport.on('fastPathData', function (secFlag, s) {
			self.recvFastPath(secFlag, s);
		});
	}
}