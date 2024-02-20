function getRegExpFlags( regexp ) {
		return "flags" in regexp ? regexp.flags : regexp.toString().match( /[gimuy]*$/ )[ 0 ];
	}