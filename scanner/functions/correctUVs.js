function correctUVs() {

    			const a = new Vector3();
    			const b = new Vector3();
    			const c = new Vector3();

    			const centroid = new Vector3();

    			const uvA = new Vector2();
    			const uvB = new Vector2();
    			const uvC = new Vector2();

    			for ( let i = 0, j = 0; i < vertexBuffer.length; i += 9, j += 6 ) {

    				a.set( vertexBuffer[ i + 0 ], vertexBuffer[ i + 1 ], vertexBuffer[ i + 2 ] );
    				b.set( vertexBuffer[ i + 3 ], vertexBuffer[ i + 4 ], vertexBuffer[ i + 5 ] );
    				c.set( vertexBuffer[ i + 6 ], vertexBuffer[ i + 7 ], vertexBuffer[ i + 8 ] );

    				uvA.set( uvBuffer[ j + 0 ], uvBuffer[ j + 1 ] );
    				uvB.set( uvBuffer[ j + 2 ], uvBuffer[ j + 3 ] );
    				uvC.set( uvBuffer[ j + 4 ], uvBuffer[ j + 5 ] );

    				centroid.copy( a ).add( b ).add( c ).divideScalar( 3 );

    				const azi = azimuth( centroid );

    				correctUV( uvA, j + 0, a, azi );
    				correctUV( uvB, j + 2, b, azi );
    				correctUV( uvC, j + 4, c, azi );

    			}

    		}