function TextureManager(gpgpu) {
	    this.gpgpu = gpgpu;
	    this.numUsedTextures = 0;
	    this.numFreeTextures = 0;
	    this._numBytesAllocated = 0;
	    this._numBytesFree = 0; // How many bytes that have been allocated
	    // are available for reuse.

	    this.freeTextures = {};
	    this.logEnabled = false;
	    this.usedTextures = {};
	  }