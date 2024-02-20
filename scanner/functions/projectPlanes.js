function projectPlanes( planes, camera, dstOffset, skipTransform ) {

    		const nPlanes = planes !== null ? planes.length : 0;
    		let dstArray = null;

    		if ( nPlanes !== 0 ) {

    			dstArray = uniform.value;

    			if ( skipTransform !== true || dstArray === null ) {

    				const flatSize = dstOffset + nPlanes * 4,
    					viewMatrix = camera.matrixWorldInverse;

    				viewNormalMatrix.getNormalMatrix( viewMatrix );

    				if ( dstArray === null || dstArray.length < flatSize ) {

    					dstArray = new Float32Array( flatSize );

    				}

    				for ( let i = 0, i4 = dstOffset; i !== nPlanes; ++ i, i4 += 4 ) {

    					plane.copy( planes[ i ] ).applyMatrix4( viewMatrix, viewNormalMatrix );

    					plane.normal.toArray( dstArray, i4 );
    					dstArray[ i4 + 3 ] = plane.constant;

    				}

    			}

    			uniform.value = dstArray;
    			uniform.needsUpdate = true;

    		}

    		scope.numPlanes = nPlanes;
    		scope.numIntersection = 0;

    		return dstArray;

    	}