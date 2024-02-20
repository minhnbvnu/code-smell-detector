function createDefaultMaterial( cache ) {

    	if ( cache[ 'DefaultMaterial' ] === undefined ) {

    		cache[ 'DefaultMaterial' ] = new MeshStandardMaterial( {
    			color: 0xFFFFFF,
    			emissive: 0x000000,
    			metalness: 1,
    			roughness: 1,
    			transparent: false,
    			depthTest: true,
    			side: FrontSide
    		} );

    	}

    	return cache[ 'DefaultMaterial' ];

    }