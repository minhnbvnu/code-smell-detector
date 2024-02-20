function msdos2date(time, date) {
	    // MS-DOS Date
	    // |0 0 0 0  0|0 0 0  0|0 0 0  0 0 0 0
	    //   D (1-31)  M (1-23)  Y (from 1980)
	    var day = date & 0x1F;
	    // JS date is 0-indexed, DOS is 1-indexed.
	    var month = ((date >> 5) & 0xF) - 1;
	    var year = (date >> 9) + 1980;
	    // MS DOS Time
	    // |0 0 0 0  0|0 0 0  0 0 0|0  0 0 0 0
	    //    Second      Minute       Hour
	    var second = time & 0x1F;
	    var minute = (time >> 5) & 0x3F;
	    var hour = time >> 11;
	    return new Date(year, month, day, hour, minute, second);
	}