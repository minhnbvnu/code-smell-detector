function testPoint( point, index, localThresholdSq, matrixWorld, raycaster, intersects, object ) {

    	const rayPointDistanceSq = _ray.distanceSqToPoint( point );

    	if ( rayPointDistanceSq < localThresholdSq ) {

    		const intersectPoint = new Vector3();

    		_ray.closestPointToPoint( point, intersectPoint );
    		intersectPoint.applyMatrix4( matrixWorld );

    		const distance = raycaster.ray.origin.distanceTo( intersectPoint );

    		if ( distance < raycaster.near || distance > raycaster.far ) return;

    		intersects.push( {

    			distance: distance,
    			distanceToRay: Math.sqrt( rayPointDistanceSq ),
    			point: intersectPoint,
    			index: index,
    			face: null,
    			object: object

    		} );

    	}

    }