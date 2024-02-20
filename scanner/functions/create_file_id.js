function create_file_id(buffer)
  {
	this.buffer = buffer;
	this.offset = 0;
	this.byteArray = new Uint8Array(buffer);
  }