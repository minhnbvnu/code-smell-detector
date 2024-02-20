function intersectRay( nodeIndex32, array, ray, target ) {

    	arrayToBox( nodeIndex32, array, boundingBox );
    	return ray.intersectBox( boundingBox, target );

    }