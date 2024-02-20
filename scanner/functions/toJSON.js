function toJSON( shapes, data ) {

    	data.shapes = [];

    	if ( Array.isArray( shapes ) ) {

    		for ( let i = 0, l = shapes.length; i < l; i ++ ) {

    			const shape = shapes[ i ];

    			data.shapes.push( shape.uuid );

    		}

    	} else {

    		data.shapes.push( shapes.uuid );

    	}

    	return data;

    }