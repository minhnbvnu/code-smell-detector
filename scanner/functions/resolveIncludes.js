function resolveIncludes( string ) {

    	return string.replace( includePattern, includeReplacer );

    }