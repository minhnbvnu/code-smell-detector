function MathBackendCPU() {
	    var _this;

	    _this = _KernelBackend.call(this) || this;
	    _this.blockSize = 48;
	    _this.firstUse = true;
	    _this.data = new DataStorage(_assertThisInitialized(_this), engine());
	    return _this;
	  }