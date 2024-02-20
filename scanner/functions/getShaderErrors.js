function getShaderErrors( gl, shader, type ) {

    	const status = gl.getShaderParameter( shader, 35713 );
    	const errors = gl.getShaderInfoLog( shader ).trim();

    	if ( status && errors === '' ) return '';

    	// --enable-privileged-webgl-extension
    	// console.log( '**' + type + '**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

    	return type.toUpperCase() + '\n\n' + errors + '\n\n' + addLineNumbers( gl.getShaderSource( shader ) );

    }