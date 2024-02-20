function buildLidFaces() {

    				const start = verticesArray.length / 3;

    				if ( bevelEnabled ) {

    					let layer = 0; // steps + 1
    					let offset = vlen * layer;

    					// Bottom faces

    					for ( let i = 0; i < flen; i ++ ) {

    						const face = faces[ i ];
    						f3( face[ 2 ] + offset, face[ 1 ] + offset, face[ 0 ] + offset );

    					}

    					layer = steps + bevelSegments * 2;
    					offset = vlen * layer;

    					// Top faces

    					for ( let i = 0; i < flen; i ++ ) {

    						const face = faces[ i ];
    						f3( face[ 0 ] + offset, face[ 1 ] + offset, face[ 2 ] + offset );

    					}

    				} else {

    					// Bottom faces

    					for ( let i = 0; i < flen; i ++ ) {

    						const face = faces[ i ];
    						f3( face[ 2 ], face[ 1 ], face[ 0 ] );

    					}

    					// Top faces

    					for ( let i = 0; i < flen; i ++ ) {

    						const face = faces[ i ];
    						f3( face[ 0 ] + vlen * steps, face[ 1 ] + vlen * steps, face[ 2 ] + vlen * steps );

    					}

    				}

    				scope.addGroup( start, verticesArray.length / 3 - start, 0 );

    			}