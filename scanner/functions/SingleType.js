function SingleType(value, nbBytes, readBufferCallback, writeBufferCallback, opt){
	Type.call(this, opt);
	this.value = value || 0;
	this.nbBytes = nbBytes;
	this.readBufferCallback = readBufferCallback;
	this.writeBufferCallback = writeBufferCallback;
}