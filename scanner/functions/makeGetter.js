function makeGetter(name) {
	        return function () {
	            return this.isValid() ? this._data[name] : NaN;
	        };
	    }