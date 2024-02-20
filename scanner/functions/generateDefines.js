function generateDefines( defines ) {

    	const chunks = [];

    	for ( const name in defines ) {

    		const value = defines[ name ];

    		if ( value === false ) continue;

    		chunks.push( '#define ' + name + ' ' + value );

    	}

    	return chunks.join( '\n' );

    }