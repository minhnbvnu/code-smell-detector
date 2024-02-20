function IPCFailure(sc, sender, resultCode) {
	this.resultCode = resultCode;
	this.sc = sc;
	this.sender = sender;
}