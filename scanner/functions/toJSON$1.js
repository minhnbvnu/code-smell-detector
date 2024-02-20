function toJSON$1( shapes, options, data ) {

    	data.shapes = [];

    	if ( Array.isArray( shapes ) ) {

    		for ( let i = 0, l = shapes.length; i < l; i ++ ) {

    			const shape = shapes[ i ];

    			data.shapes.push( shape.uuid );

    		}

    	} else {

    		data.shapes.push( shapes.uuid );

    	}

    	if ( options.extrudePath !== undefined ) data.options.extrudePath = options.extrudePath.toJSON();

    	return data;

    }