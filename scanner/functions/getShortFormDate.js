function getShortFormDate(data, startIndex) {
	    var yearsSince1900 = data[startIndex];
	    var month = data[startIndex + 1];
	    var day = data[startIndex + 2];
	    var hour = data[startIndex + 3];
	    var minute = data[startIndex + 4];
	    var second = data[startIndex + 5];
	    // JavaScript's Date support isn't so great; ignore timezone.
	    // const offsetFromGMT = this._data[24];
	    return new Date(yearsSince1900, month - 1, day, hour, minute, second);
	}