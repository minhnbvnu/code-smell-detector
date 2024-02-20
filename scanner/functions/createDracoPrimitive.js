function createDracoPrimitive( primitive ) {

    			return extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ]
    				.decodePrimitive( primitive, parser )
    				.then( function ( geometry ) {

    					return addPrimitiveAttributes( geometry, primitive, parser );

    				} );

    		}