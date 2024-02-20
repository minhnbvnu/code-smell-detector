function generateUVs() {

    			const vertex = new Vector3();

    			for ( let i = 0; i < vertexBuffer.length; i += 3 ) {

    				vertex.x = vertexBuffer[ i + 0 ];
    				vertex.y = vertexBuffer[ i + 1 ];
    				vertex.z = vertexBuffer[ i + 2 ];

    				const u = azimuth( vertex ) / 2 / Math.PI + 0.5;
    				const v = inclination( vertex ) / Math.PI + 0.5;
    				uvBuffer.push( u, 1 - v );

    			}

    			correctUVs();

    			correctSeam();

    		}