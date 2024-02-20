function parseUniform( activeInfo, addr, container ) {

    	const path = activeInfo.name,
    		pathLength = path.length;

    	// reset RegExp object, because of the early exit of a previous run
    	RePathPart.lastIndex = 0;

    	while ( true ) {

    		const match = RePathPart.exec( path ),
    			matchEnd = RePathPart.lastIndex;

    		let id = match[ 1 ];
    		const idIsIndex = match[ 2 ] === ']',
    			subscript = match[ 3 ];

    		if ( idIsIndex ) id = id | 0; // convert to integer

    		if ( subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength ) {

    			// bare name or "pure" bottom-level array "[0]" suffix

    			addUniform( container, subscript === undefined ?
    				new SingleUniform( id, activeInfo, addr ) :
    				new PureArrayUniform( id, activeInfo, addr ) );

    			break;

    		} else {

    			// step into inner node / create it in case it doesn't exist

    			const map = container.map;
    			let next = map[ id ];

    			if ( next === undefined ) {

    				next = new StructuredUniform( id );
    				addUniform( container, next );

    			}

    			container = next;

    		}

    	}

    }