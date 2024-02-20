function addShape( shape ) {

    			const indexOffset = vertices.length / 3;
    			const points = shape.extractPoints( curveSegments );

    			let shapeVertices = points.shape;
    			const shapeHoles = points.holes;

    			// check direction of vertices

    			if ( ShapeUtils.isClockWise( shapeVertices ) === false ) {

    				shapeVertices = shapeVertices.reverse();

    			}

    			for ( let i = 0, l = shapeHoles.length; i < l; i ++ ) {

    				const shapeHole = shapeHoles[ i ];

    				if ( ShapeUtils.isClockWise( shapeHole ) === true ) {

    					shapeHoles[ i ] = shapeHole.reverse();

    				}

    			}

    			const faces = ShapeUtils.triangulateShape( shapeVertices, shapeHoles );

    			// join vertices of inner and outer paths to a single array

    			for ( let i = 0, l = shapeHoles.length; i < l; i ++ ) {

    				const shapeHole = shapeHoles[ i ];
    				shapeVertices = shapeVertices.concat( shapeHole );

    			}

    			// vertices, normals, uvs

    			for ( let i = 0, l = shapeVertices.length; i < l; i ++ ) {

    				const vertex = shapeVertices[ i ];

    				vertices.push( vertex.x, vertex.y, 0 );
    				normals.push( 0, 0, 1 );
    				uvs.push( vertex.x, vertex.y ); // world uvs

    			}

    			// incides

    			for ( let i = 0, l = faces.length; i < l; i ++ ) {

    				const face = faces[ i ];

    				const a = face[ 0 ] + indexOffset;
    				const b = face[ 1 ] + indexOffset;
    				const c = face[ 2 ] + indexOffset;

    				indices.push( a, b, c );
    				groupCount += 3;

    			}

    		}