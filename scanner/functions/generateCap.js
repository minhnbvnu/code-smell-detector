function generateCap( top ) {

    			// save the index of the first center vertex
    			const centerIndexStart = index;

    			const uv = new Vector2();
    			const vertex = new Vector3();

    			let groupCount = 0;

    			const radius = ( top === true ) ? radiusTop : radiusBottom;
    			const sign = ( top === true ) ? 1 : - 1;

    			// first we generate the center vertex data of the cap.
    			// because the geometry needs one set of uvs per face,
    			// we must generate a center vertex per face/segment

    			for ( let x = 1; x <= radialSegments; x ++ ) {

    				// vertex

    				vertices.push( 0, halfHeight * sign, 0 );

    				// normal

    				normals.push( 0, sign, 0 );

    				// uv

    				uvs.push( 0.5, 0.5 );

    				// increase index

    				index ++;

    			}

    			// save the index of the last center vertex
    			const centerIndexEnd = index;

    			// now we generate the surrounding vertices, normals and uvs

    			for ( let x = 0; x <= radialSegments; x ++ ) {

    				const u = x / radialSegments;
    				const theta = u * thetaLength + thetaStart;

    				const cosTheta = Math.cos( theta );
    				const sinTheta = Math.sin( theta );

    				// vertex

    				vertex.x = radius * sinTheta;
    				vertex.y = halfHeight * sign;
    				vertex.z = radius * cosTheta;
    				vertices.push( vertex.x, vertex.y, vertex.z );

    				// normal

    				normals.push( 0, sign, 0 );

    				// uv

    				uv.x = ( cosTheta * 0.5 ) + 0.5;
    				uv.y = ( sinTheta * 0.5 * sign ) + 0.5;
    				uvs.push( uv.x, uv.y );

    				// increase index

    				index ++;

    			}

    			// generate indices

    			for ( let x = 0; x < radialSegments; x ++ ) {

    				const c = centerIndexStart + x;
    				const i = centerIndexEnd + x;

    				if ( top === true ) {

    					// face top

    					indices.push( i, i + 1, c );

    				} else {

    					// face bottom

    					indices.push( i + 1, i, c );

    				}

    				groupCount += 3;

    			}

    			// add a group to the geometry. this will ensure multi material support

    			scope.addGroup( groupStart, groupCount, top === true ? 1 : 2 );

    			// calculate new start value for groups

    			groupStart += groupCount;

    		}