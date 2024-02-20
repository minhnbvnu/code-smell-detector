function errorString( error ) {
	var name, message,
		resultErrorString = error.toString();
	if ( resultErrorString.substring( 0, 7 ) === "[object" ) {
		name = error.name ? error.name.toString() : "Error";
		message = error.message ? error.message.toString() : "";
		if ( name && message ) {
			return name + ": " + message;
		} else if ( name ) {
			return name;
		} else if ( message ) {
			return message;
		} else {
			return "Error";
		}
	} else {
		return resultErrorString;
	}
}