function getTexelDecodingFunction( functionName, encoding ) {

    	const components = getEncodingComponents( encoding );
    	return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[ 0 ] + 'ToLinear' + components[ 1 ] + '; }';

    }