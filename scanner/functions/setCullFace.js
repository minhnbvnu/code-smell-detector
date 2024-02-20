function setCullFace( cullFace ) {

    		if ( cullFace !== CullFaceNone ) {

    			enable( 2884 );

    			if ( cullFace !== currentCullFace ) {

    				if ( cullFace === CullFaceBack ) {

    					gl.cullFace( 1029 );

    				} else if ( cullFace === CullFaceFront ) {

    					gl.cullFace( 1028 );

    				} else {

    					gl.cullFace( 1032 );

    				}

    			}

    		} else {

    			disable( 2884 );

    		}

    		currentCullFace = cullFace;

    	}