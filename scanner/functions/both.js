function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	}