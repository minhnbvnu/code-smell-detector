function generatePrecision( parameters ) {

    	let precisionstring = 'precision ' + parameters.precision + ' float;\nprecision ' + parameters.precision + ' int;';

    	if ( parameters.precision === 'highp' ) {

    		precisionstring += '\n#define HIGH_PRECISION';

    	} else if ( parameters.precision === 'mediump' ) {

    		precisionstring += '\n#define MEDIUM_PRECISION';

    	} else if ( parameters.precision === 'lowp' ) {

    		precisionstring += '\n#define LOW_PRECISION';

    	}

    	return precisionstring;

    }