function getInternalFormat( internalFormatName, glFormat, glType/*, encoding*/ ) {

    		if ( isWebGL2 === false ) return glFormat;

    		if ( internalFormatName !== null ) {

    			if ( _gl[ internalFormatName ] !== undefined ) return _gl[ internalFormatName ];

    			console.warn( 'THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format \'' + internalFormatName + '\'' );

    		}

    		let internalFormat = glFormat;

    		if ( glFormat === 6403 ) {

    			if ( glType === 5126 ) internalFormat = 33326;
    			if ( glType === 5131 ) internalFormat = 33325;
    			if ( glType === 5121 ) internalFormat = 33321;

    		}

    		if ( glFormat === 6407 ) {

    			if ( glType === 5126 ) internalFormat = 34837;
    			if ( glType === 5131 ) internalFormat = 34843;
    			if ( glType === 5121 ) internalFormat = 32849;

    		}

    		if ( glFormat === 6408 ) {

    			if ( glType === 5126 ) internalFormat = 34836;
    			if ( glType === 5131 ) internalFormat = 34842;
    			//if ( glType === 5121 ) internalFormat = ( encoding === sRGBEncoding ) ? 35907 : 32856;
    			if ( glType === 5121 ) internalFormat = 32856;


    		}

    		if ( internalFormat === 33325 || internalFormat === 33326 ||
    			internalFormat === 34842 || internalFormat === 34836 ) {

    			extensions.get( 'EXT_color_buffer_float' );

    		}

    		return internalFormat;

    	}