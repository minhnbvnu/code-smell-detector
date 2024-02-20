function time$1(a, b, aRow, bRow, column, dir, params){
		if(!params.format){
			params.format = "HH:mm";
		}

		return datetime$2.call(this, a, b, aRow, bRow, column, dir, params);
	}