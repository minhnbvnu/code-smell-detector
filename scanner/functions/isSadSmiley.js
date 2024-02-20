function isSadSmiley(string) {
		return string.toLowerCase().match(/[:;]'?\-?\(/) !== null;
	}