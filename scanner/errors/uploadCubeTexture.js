function uploadCubeTexture( textureProperties, texture, slot ) {

    		if ( texture.image.length !== 6 ) return;

    		initTexture( textureProperties, texture );

    		state.activeTexture( 33984 + slot );
    		state.bindTexture( 34067, textureProperties.__webglTexture );

    		_gl.pixelStorei( 37440, texture.flipY );
    		_gl.pixelStorei( 37441, texture.premultiplyAlpha );
    		_gl.pixelStorei( 3317, texture.unpackAlignment );
    		_gl.pixelStorei( 37443, 0 );

    		const isCompressed = ( texture && ( texture.isCompressedTexture || texture.image[ 0 ].isCompressedTexture ) );
    		const isDataTexture = ( texture.image[ 0 ] && texture.image[ 0 ].isDataTexture );

    		const cubeImage = [];

    		for ( let i = 0; i < 6; i ++ ) {

    			if ( ! isCompressed && ! isDataTexture ) {

    				cubeImage[ i ] = resizeImage( texture.image[ i ], false, true, maxCubemapSize );

    			} else {

    				cubeImage[ i ] = isDataTexture ? texture.image[ i ].image : texture.image[ i ];

    			}

    		}

    		const image = cubeImage[ 0 ],
    			supportsMips = isPowerOfTwo$1( image ) || isWebGL2,
    			glFormat = utils.convert( texture.format ),
    			glType = utils.convert( texture.type ),
    			glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType, texture.encoding );

    		setTextureParameters( 34067, texture, supportsMips );

    		let mipmaps;

    		if ( isCompressed ) {

    			for ( let i = 0; i < 6; i ++ ) {

    				mipmaps = cubeImage[ i ].mipmaps;

    				for ( let j = 0; j < mipmaps.length; j ++ ) {

    					const mipmap = mipmaps[ j ];

    					if ( texture.format !== RGBAFormat && texture.format !== RGBFormat ) {

    						if ( glFormat !== null ) {

    							state.compressedTexImage2D( 34069 + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data );

    						} else {

    							console.warn( 'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()' );

    						}

    					} else {

    						state.texImage2D( 34069 + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

    					}

    				}

    			}

    		} else {

    			mipmaps = texture.mipmaps;

    			for ( let i = 0; i < 6; i ++ ) {

    				if ( isDataTexture ) {

    					state.texImage2D( 34069 + i, 0, glInternalFormat, cubeImage[ i ].width, cubeImage[ i ].height, 0, glFormat, glType, cubeImage[ i ].data );

    					for ( let j = 0; j < mipmaps.length; j ++ ) {

    						const mipmap = mipmaps[ j ];
    						const mipmapImage = mipmap.image[ i ].image;

    						state.texImage2D( 34069 + i, j + 1, glInternalFormat, mipmapImage.width, mipmapImage.height, 0, glFormat, glType, mipmapImage.data );

    					}

    				} else {

    					state.texImage2D( 34069 + i, 0, glInternalFormat, glFormat, glType, cubeImage[ i ] );

    					for ( let j = 0; j < mipmaps.length; j ++ ) {

    						const mipmap = mipmaps[ j ];

    						state.texImage2D( 34069 + i, j + 1, glInternalFormat, glFormat, glType, mipmap.image[ i ] );

    					}

    				}

    			}

    		}

    		if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

    			// We assume images for cube map have the same size.
    			generateMipmap( 34067 );

    		}

    		textureProperties.__version = texture.version;

    		if ( texture.onUpdate ) texture.onUpdate( texture );

    	}