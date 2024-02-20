function setOffsetToParsedOffset () {
	        if (this._tzm != null) {
	            this.utcOffset(this._tzm, false, true);
	        } else if (typeof this._i === 'string') {
	            var tZone = offsetFromString(matchOffset, this._i);
	            if (tZone != null) {
	                this.utcOffset(tZone);
	            }
	            else {
	                this.utcOffset(0, true);
	            }
	        }
	        return this;
	    }