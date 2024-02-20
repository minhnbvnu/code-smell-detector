function replaceClippingPlaneNums( string, parameters ) {

    	return string
    		.replace( /NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes )
    		.replace( /UNION_CLIPPING_PLANES/g, ( parameters.numClippingPlanes - parameters.numClipIntersection ) );

    }