function allocateTextureUnit() {

    		const textureUnit = textureUnits;

    		if ( textureUnit >= maxTextures ) {

    			console.warn( 'THREE.WebGLTextures: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + maxTextures );

    		}

    		textureUnits += 1;

    		return textureUnit;

    	}