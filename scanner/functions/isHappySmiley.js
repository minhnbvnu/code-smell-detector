function isHappySmiley(string) {
		return string.toLowerCase().match(/[:;]-?[\)D]/) !== null;
	}