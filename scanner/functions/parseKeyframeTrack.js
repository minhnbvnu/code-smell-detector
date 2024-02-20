function parseKeyframeTrack( json ) {

    	if ( json.type === undefined ) {

    		throw new Error( 'THREE.KeyframeTrack: track type undefined, can not parse' );

    	}

    	const trackType = getTrackTypeForValueTypeName( json.type );

    	if ( json.times === undefined ) {

    		const times = [], values = [];

    		AnimationUtils.flattenJSON( json.keys, times, values, 'value' );

    		json.times = times;
    		json.values = values;

    	}

    	// derived classes can define a static parse method
    	if ( trackType.parse !== undefined ) {

    		return trackType.parse( json );

    	} else {

    		// by default, we assume a constructor compatible with the base
    		return new trackType( json.name, json.times, json.values, json.interpolation );

    	}

    }