function convertRaycastIntersect( hit, object, raycaster ) {

    	if ( hit === null ) {

    		return null;

    	}

    	hit.point.applyMatrix4( object.matrixWorld );
    	hit.distance = hit.point.distanceTo( raycaster.ray.origin );
    	hit.object = object;

    	if ( hit.distance < raycaster.near || hit.distance > raycaster.far ) {

    		return null;

    	} else {

    		return hit;

    	}

    }