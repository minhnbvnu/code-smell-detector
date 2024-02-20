function setTextureParameters( textureType, texture, supportsMips ) {

    		if ( supportsMips ) {

    			_gl.texParameteri( textureType, 10242, wrappingToGL[ texture.wrapS ] );
    			_gl.texParameteri( textureType, 10243, wrappingToGL[ texture.wrapT ] );

    			if ( textureType === 32879 || textureType === 35866 ) {

    				_gl.texParameteri( textureType, 32882, wrappingToGL[ texture.wrapR ] );

    			}

    			_gl.texParameteri( textureType, 10240, filterToGL[ texture.magFilter ] );
    			_gl.texParameteri( textureType, 10241, filterToGL[ texture.minFilter ] );

    		} else {

    			_gl.texParameteri( textureType, 10242, 33071 );
    			_gl.texParameteri( textureType, 10243, 33071 );

    			if ( textureType === 32879 || textureType === 35866 ) {

    				_gl.texParameteri( textureType, 32882, 33071 );

    			}

    			if ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) {

    				console.warn( 'THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.' );

    			}

    			_gl.texParameteri( textureType, 10240, filterFallback( texture.magFilter ) );
    			_gl.texParameteri( textureType, 10241, filterFallback( texture.minFilter ) );

    			if ( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter ) {

    				console.warn( 'THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.' );

    			}

    		}

    		if ( extensions.has( 'EXT_texture_filter_anisotropic' ) === true ) {

    			const extension = extensions.get( 'EXT_texture_filter_anisotropic' );

    			if ( texture.type === FloatType && extensions.has( 'OES_texture_float_linear' ) === false ) return; // verify extension for WebGL 1 and WebGL 2
    			if ( isWebGL2 === false && ( texture.type === HalfFloatType && extensions.has( 'OES_texture_half_float_linear' ) === false ) ) return; // verify extension for WebGL 1 only

    			if ( texture.anisotropy > 1 || properties.get( texture ).__currentAnisotropy ) {

    				_gl.texParameterf( textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min( texture.anisotropy, capabilities.getMaxAnisotropy() ) );
    				properties.get( texture ).__currentAnisotropy = texture.anisotropy;

    			}

    		}

    	}