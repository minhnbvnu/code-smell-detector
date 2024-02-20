function IPCMessage (sc, sender, cmdId) {
	this.sc = sc;
	this.sender = sender;
	this.pid = null;
	this.type = 4;
	this.cmdId = cmdId;
	this.resultCode = cmdId;
	this.success = this.resultCode === 0 || this.resultCode === undefined;
	this.dataBuffer = [];
	this.aDescriptors = [];
	this.bDescriptors = [];
	this.cDescriptors = [];
	this.xDescriptors = [];
	this.copiedHandles = [];
	this.movedHandles = [];
	this.objectDomainCommand = undefined;
	this.objectId = 0;
	this.inputObjectIds = [];
	this.copyBuffers = [];
}