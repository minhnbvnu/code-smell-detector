function loadTexture( i ) {

    			loader.load( urls[ i ], function ( image ) {

    				texture.images[ i ] = image;

    				loaded ++;

    				if ( loaded === 6 ) {

    					texture.needsUpdate = true;

    					if ( onLoad ) onLoad( texture );

    				}

    			}, undefined, onError );

    		}