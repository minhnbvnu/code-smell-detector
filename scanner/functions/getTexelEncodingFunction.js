function getTexelEncodingFunction( functionName, encoding ) {

    	const components = getEncodingComponents( encoding );
    	return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[ 0 ] + components[ 1 ] + '; }';

    }