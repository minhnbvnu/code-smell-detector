function padValue(){
		var result = "" + value;
		while (result.length < padLength){
			result = padChar + result;
		}
		return result;
	}