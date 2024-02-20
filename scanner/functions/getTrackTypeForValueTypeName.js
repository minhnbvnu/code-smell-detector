function getTrackTypeForValueTypeName( typeName ) {

    	switch ( typeName.toLowerCase() ) {

    		case 'scalar':
    		case 'double':
    		case 'float':
    		case 'number':
    		case 'integer':

    			return NumberKeyframeTrack;

    		case 'vector':
    		case 'vector2':
    		case 'vector3':
    		case 'vector4':

    			return VectorKeyframeTrack;

    		case 'color':

    			return ColorKeyframeTrack;

    		case 'quaternion':

    			return QuaternionKeyframeTrack;

    		case 'bool':
    		case 'boolean':

    			return BooleanKeyframeTrack;

    		case 'string':

    			return StringKeyframeTrack;

    	}

    	throw new Error( 'THREE.KeyframeTrack: Unsupported typeName: ' + typeName );

    }