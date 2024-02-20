function TTY() {
	        _super.call(this);
	        this.isRaw = false;
	        this.columns = 80;
	        this.rows = 120;
	        this.isTTY = true;
	        this._bufferedWrites = [];
	        this._waitingForWrites = false;
	    }