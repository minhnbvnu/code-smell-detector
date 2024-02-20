function subdivide( detail ) {

    			const a = new Vector3();
    			const b = new Vector3();
    			const c = new Vector3();

    			// iterate over all faces and apply a subdivison with the given detail value

    			for ( let i = 0; i < indices.length; i += 3 ) {

    				// get the vertices of the face

    				getVertexByIndex( indices[ i + 0 ], a );
    				getVertexByIndex( indices[ i + 1 ], b );
    				getVertexByIndex( indices[ i + 2 ], c );

    				// perform subdivision

    				subdivideFace( a, b, c, detail );

    			}

    		}