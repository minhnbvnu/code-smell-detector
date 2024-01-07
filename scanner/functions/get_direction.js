function get_direction(language = current_language) {
		return language.match(/^(ar|dv|fa|ha|he|ks|ku|ms|pa|ps|sd|ug|yi)\b/i) ? "rtl" : "ltr";
	}