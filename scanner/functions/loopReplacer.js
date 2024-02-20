function loopReplacer( match, start, end, snippet ) {

    	let string = '';

    	for ( let i = parseInt( start ); i < parseInt( end ); i ++ ) {

    		string += snippet
    			.replace( /\[\s*i\s*\]/g, '[ ' + i + ' ]' )
    			.replace( /UNROLLED_LOOP_INDEX/g, i );

    	}

    	return string;

    }