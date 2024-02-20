function MCS(transport, recvOpCode, sendOpCode) {
	this.transport = transport;
	this.recvOpCode = recvOpCode;
	this.sendOpCode = sendOpCode;
	this.channels = [{id : Channel.MCS_GLOBAL_CHANNEL, name : 'global'}];
	this.channels.find = function(callback) {
		for(var i in this) {
			if(callback(this[i])) return this[i];
		};
	};
	
	// bind events
	var self = this;
	this.transport.on('close', function () {
		self.emit('close');
	}).on('error', function (err) {
		self.emit('error', err);
	});
}