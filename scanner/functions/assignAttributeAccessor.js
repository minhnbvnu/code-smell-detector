function assignAttributeAccessor( accessorIndex, attributeName ) {

    		return parser.getDependency( 'accessor', accessorIndex )
    			.then( function ( accessor ) {

    				geometry.setAttribute( attributeName, accessor );

    			} );

    	}