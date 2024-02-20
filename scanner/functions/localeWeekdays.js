function localeWeekdays (m, format) {
	        if (!m) {
	            return isArray(this._weekdays) ? this._weekdays :
	                this._weekdays['standalone'];
	        }
	        return isArray(this._weekdays) ? this._weekdays[m.day()] :
	            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	    }