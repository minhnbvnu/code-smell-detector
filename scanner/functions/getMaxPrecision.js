function getMaxPrecision( precision ) {

    		if ( precision === 'highp' ) {

    			if ( gl.getShaderPrecisionFormat( 35633, 36338 ).precision > 0 &&
    				gl.getShaderPrecisionFormat( 35632, 36338 ).precision > 0 ) {

    				return 'highp';

    			}

    			precision = 'mediump';

    		}

    		if ( precision === 'mediump' ) {

    			if ( gl.getShaderPrecisionFormat( 35633, 36337 ).precision > 0 &&
    				gl.getShaderPrecisionFormat( 35632, 36337 ).precision > 0 ) {

    				return 'mediump';

    			}

    		}

    		return 'lowp';

    	}