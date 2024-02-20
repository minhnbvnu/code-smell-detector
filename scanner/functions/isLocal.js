function isLocal () {
	        return this.isValid() ? !this._isUTC : false;
	    }