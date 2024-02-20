function getEncodingComponents( encoding ) {

    	switch ( encoding ) {

    		case LinearEncoding:
    			return [ 'Linear', '( value )' ];
    		case sRGBEncoding:
    			return [ 'sRGB', '( value )' ];
    		case RGBEEncoding:
    			return [ 'RGBE', '( value )' ];
    		case RGBM7Encoding:
    			return [ 'RGBM', '( value, 7.0 )' ];
    		case RGBM16Encoding:
    			return [ 'RGBM', '( value, 16.0 )' ];
    		case RGBDEncoding:
    			return [ 'RGBD', '( value, 256.0 )' ];
    		case GammaEncoding:
    			return [ 'Gamma', '( value, float( GAMMA_FACTOR ) )' ];
    		default:
    			console.warn( 'THREE.WebGLProgram: Unsupported encoding:', encoding );
    			return [ 'Linear', '( value )' ];

    	}

    }