function generateTorso() {

    			const normal = new Vector3();
    			const vertex = new Vector3();

    			let groupCount = 0;

    			// this will be used to calculate the normal
    			const slope = ( radiusBottom - radiusTop ) / height;

    			// generate vertices, normals and uvs

    			for ( let y = 0; y <= heightSegments; y ++ ) {

    				const indexRow = [];

    				const v = y / heightSegments;

    				// calculate the radius of the current row

    				const radius = v * ( radiusBottom - radiusTop ) + radiusTop;

    				for ( let x = 0; x <= radialSegments; x ++ ) {

    					const u = x / radialSegments;

    					const theta = u * thetaLength + thetaStart;

    					const sinTheta = Math.sin( theta );
    					const cosTheta = Math.cos( theta );

    					// vertex

    					vertex.x = radius * sinTheta;
    					vertex.y = - v * height + halfHeight;
    					vertex.z = radius * cosTheta;
    					vertices.push( vertex.x, vertex.y, vertex.z );

    					// normal

    					normal.set( sinTheta, slope, cosTheta ).normalize();
    					normals.push( normal.x, normal.y, normal.z );

    					// uv

    					uvs.push( u, 1 - v );

    					// save index of vertex in respective row

    					indexRow.push( index ++ );

    				}

    				// now save vertices of the row in our index array

    				indexArray.push( indexRow );

    			}

    			// generate indices

    			for ( let x = 0; x < radialSegments; x ++ ) {

    				for ( let y = 0; y < heightSegments; y ++ ) {

    					// we use the index array to access the correct indices

    					const a = indexArray[ y ][ x ];
    					const b = indexArray[ y + 1 ][ x ];
    					const c = indexArray[ y + 1 ][ x + 1 ];
    					const d = indexArray[ y ][ x + 1 ];

    					// faces

    					indices.push( a, b, d );
    					indices.push( b, c, d );

    					// update group counter

    					groupCount += 6;

    				}

    			}

    			// add a group to the geometry. this will ensure multi material support

    			scope.addGroup( groupStart, groupCount, 0 );

    			// calculate new start value for groups

    			groupStart += groupCount;

    		}