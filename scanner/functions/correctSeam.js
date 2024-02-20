function correctSeam() {

    			// handle case when face straddles the seam, see #3269

    			for ( let i = 0; i < uvBuffer.length; i += 6 ) {

    				// uv data of a single face

    				const x0 = uvBuffer[ i + 0 ];
    				const x1 = uvBuffer[ i + 2 ];
    				const x2 = uvBuffer[ i + 4 ];

    				const max = Math.max( x0, x1, x2 );
    				const min = Math.min( x0, x1, x2 );

    				// 0.9 is somewhat arbitrary

    				if ( max > 0.9 && min < 0.1 ) {

    					if ( x0 < 0.2 ) uvBuffer[ i + 0 ] += 1;
    					if ( x1 < 0.2 ) uvBuffer[ i + 2 ] += 1;
    					if ( x2 < 0.2 ) uvBuffer[ i + 4 ] += 1;

    				}

    			}

    		}