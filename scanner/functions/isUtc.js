function isUtc () {
	        return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    }