function subdivideFace( a, b, c, detail ) {

    			const cols = detail + 1;

    			// we use this multidimensional array as a data structure for creating the subdivision

    			const v = [];

    			// construct all of the vertices for this subdivision

    			for ( let i = 0; i <= cols; i ++ ) {

    				v[ i ] = [];

    				const aj = a.clone().lerp( c, i / cols );
    				const bj = b.clone().lerp( c, i / cols );

    				const rows = cols - i;

    				for ( let j = 0; j <= rows; j ++ ) {

    					if ( j === 0 && i === cols ) {

    						v[ i ][ j ] = aj;

    					} else {

    						v[ i ][ j ] = aj.clone().lerp( bj, j / rows );

    					}

    				}

    			}

    			// construct all of the faces

    			for ( let i = 0; i < cols; i ++ ) {

    				for ( let j = 0; j < 2 * ( cols - i ) - 1; j ++ ) {

    					const k = Math.floor( j / 2 );

    					if ( j % 2 === 0 ) {

    						pushVertex( v[ i ][ k + 1 ] );
    						pushVertex( v[ i + 1 ][ k ] );
    						pushVertex( v[ i ][ k ] );

    					} else {

    						pushVertex( v[ i ][ k + 1 ] );
    						pushVertex( v[ i + 1 ][ k + 1 ] );
    						pushVertex( v[ i + 1 ][ k ] );

    					}

    				}

    			}

    		}