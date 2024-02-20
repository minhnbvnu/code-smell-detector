function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}