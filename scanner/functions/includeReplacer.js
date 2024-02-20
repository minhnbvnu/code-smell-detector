function includeReplacer( match, include ) {

    	const string = ShaderChunk[ include ];

    	if ( string === undefined ) {

    		throw new Error( 'Can not resolve #include <' + include + '>' );

    	}

    	return resolveIncludes( string );

    }