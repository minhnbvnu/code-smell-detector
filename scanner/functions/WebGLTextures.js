function WebGLTextures( _gl, extensions, state, properties, capabilities, utils, info ) {

    	const isWebGL2 = capabilities.isWebGL2;
    	const maxTextures = capabilities.maxTextures;
    	const maxCubemapSize = capabilities.maxCubemapSize;
    	const maxTextureSize = capabilities.maxTextureSize;
    	const maxSamples = capabilities.maxSamples;
    	const hasMultisampledRenderToTexture = extensions.has( 'WEBGL_multisampled_render_to_texture' );
    	const MultisampledRenderToTextureExtension = hasMultisampledRenderToTexture ? extensions.get( 'WEBGL_multisampled_render_to_texture' ) : undefined;

    	const _videoTextures = new WeakMap();
    	let _canvas;

    	// cordova iOS (as of 5.0) still uses UIWebView, which provides OffscreenCanvas,
    	// also OffscreenCanvas.getContext("webgl"), but not OffscreenCanvas.getContext("2d")!
    	// Some implementations may only implement OffscreenCanvas partially (e.g. lacking 2d).

    	let useOffscreenCanvas = false;

    	try {

    		useOffscreenCanvas = typeof OffscreenCanvas !== 'undefined'
    			&& ( new OffscreenCanvas( 1, 1 ).getContext( '2d' ) ) !== null;

    	} catch ( err ) {

    		// Ignore any errors

    	}

    	function createCanvas( width, height ) {

    		// Use OffscreenCanvas when available. Specially needed in web workers

    		return useOffscreenCanvas ?
    			new OffscreenCanvas( width, height ) : createElementNS( 'canvas' );

    	}

    	function resizeImage( image, needsPowerOfTwo, needsNewCanvas, maxSize ) {

    		let scale = 1;

    		// handle case if texture exceeds max size

    		if ( image.width > maxSize || image.height > maxSize ) {

    			scale = maxSize / Math.max( image.width, image.height );

    		}

    		// only perform resize if necessary

    		if ( scale < 1 || needsPowerOfTwo === true ) {

    			// only perform resize for certain image types

    			if ( ( typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement ) ||
    				( typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement ) ||
    				( typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap ) ) {

    				const floor = needsPowerOfTwo ? floorPowerOfTwo : Math.floor;

    				const width = floor( scale * image.width );
    				const height = floor( scale * image.height );

    				if ( _canvas === undefined ) _canvas = createCanvas( width, height );

    				// cube textures can't reuse the same canvas

    				const canvas = needsNewCanvas ? createCanvas( width, height ) : _canvas;

    				canvas.width = width;
    				canvas.height = height;

    				const context = canvas.getContext( '2d' );
    				context.drawImage( image, 0, 0, width, height );

    				console.warn( 'THREE.WebGLRenderer: Texture has been resized from (' + image.width + 'x' + image.height + ') to (' + width + 'x' + height + ').' );

    				return canvas;

    			} else {

    				if ( 'data' in image ) {

    					console.warn( 'THREE.WebGLRenderer: Image in DataTexture is too big (' + image.width + 'x' + image.height + ').' );

    				}

    				return image;

    			}

    		}

    		return image;

    	}

    	function isPowerOfTwo$1( image ) {

    		return isPowerOfTwo( image.width ) && isPowerOfTwo( image.height );

    	}

    	function textureNeedsPowerOfTwo( texture ) {

    		if ( isWebGL2 ) return false;

    		return ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) ||
    			( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter );

    	}

    	function textureNeedsGenerateMipmaps( texture, supportsMips ) {

    		return texture.generateMipmaps && supportsMips &&
    			texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;

    	}

    	function generateMipmap( target ) {

    		_gl.generateMipmap( target );

    	}

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

    	function getMipLevels( texture, image, supportsMips ) {

    		if ( textureNeedsGenerateMipmaps( texture, supportsMips ) === true ) {

    			// generated mipmaps via gl.generateMipmap()

    			return Math.log2( Math.max( image.width, image.height ) ) + 1;

    		} else if ( texture.mipmaps.length > 0 ) {

    			// user-defined mipmaps

    			return texture.mipmaps.length;

    		} else {

    			// texture without mipmaps (only base level)

    			return 1;

    		}

    	}

    	// Fallback filters for non-power-of-2 textures

    	function filterFallback( f ) {

    		if ( f === NearestFilter || f === NearestMipmapNearestFilter || f === NearestMipmapLinearFilter ) {

    			return 9728;

    		}

    		return 9729;

    	}

    	//

    	function onTextureDispose( event ) {

    		const texture = event.target;

    		texture.removeEventListener( 'dispose', onTextureDispose );

    		deallocateTexture( texture );

    		if ( texture.isVideoTexture ) {

    			_videoTextures.delete( texture );

    		}

    		info.memory.textures --;

    	}

    	function onRenderTargetDispose( event ) {

    		const renderTarget = event.target;

    		renderTarget.removeEventListener( 'dispose', onRenderTargetDispose );

    		deallocateRenderTarget( renderTarget );

    	}

    	//

    	function deallocateTexture( texture ) {

    		const textureProperties = properties.get( texture );

    		if ( textureProperties.__webglInit === undefined ) return;

    		_gl.deleteTexture( textureProperties.__webglTexture );

    		properties.remove( texture );

    	}

    	function deallocateRenderTarget( renderTarget ) {

    		const texture = renderTarget.texture;

    		const renderTargetProperties = properties.get( renderTarget );
    		const textureProperties = properties.get( texture );

    		if ( ! renderTarget ) return;

    		if ( textureProperties.__webglTexture !== undefined ) {

    			_gl.deleteTexture( textureProperties.__webglTexture );

    			info.memory.textures --;

    		}

    		if ( renderTarget.depthTexture ) {

    			renderTarget.depthTexture.dispose();

    		}

    		if ( renderTarget.isWebGLCubeRenderTarget ) {

    			for ( let i = 0; i < 6; i ++ ) {

    				_gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer[ i ] );
    				if ( renderTargetProperties.__webglDepthbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthbuffer[ i ] );

    			}

    		} else {

    			_gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer );
    			if ( renderTargetProperties.__webglDepthbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthbuffer );
    			if ( renderTargetProperties.__webglMultisampledFramebuffer ) _gl.deleteFramebuffer( renderTargetProperties.__webglMultisampledFramebuffer );
    			if ( renderTargetProperties.__webglColorRenderbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglColorRenderbuffer );
    			if ( renderTargetProperties.__webglDepthRenderbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthRenderbuffer );

    		}

    		if ( renderTarget.isWebGLMultipleRenderTargets ) {

    			for ( let i = 0, il = texture.length; i < il; i ++ ) {

    				const attachmentProperties = properties.get( texture[ i ] );

    				if ( attachmentProperties.__webglTexture ) {

    					_gl.deleteTexture( attachmentProperties.__webglTexture );

    					info.memory.textures --;

    				}

    				properties.remove( texture[ i ] );

    			}

    		}

    		properties.remove( texture );
    		properties.remove( renderTarget );

    	}

    	//

    	let textureUnits = 0;

    	function resetTextureUnits() {

    		textureUnits = 0;

    	}

    	function allocateTextureUnit() {

    		const textureUnit = textureUnits;

    		if ( textureUnit >= maxTextures ) {

    			console.warn( 'THREE.WebGLTextures: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + maxTextures );

    		}

    		textureUnits += 1;

    		return textureUnit;

    	}

    	//

    	function setTexture2D( texture, slot ) {

    		const textureProperties = properties.get( texture );

    		if ( texture.isVideoTexture ) updateVideoTexture( texture );

    		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

    			const image = texture.image;

    			if ( image === undefined ) {

    				console.warn( 'THREE.WebGLRenderer: Texture marked for update but image is undefined' );

    			} else if ( image.complete === false ) {

    				console.warn( 'THREE.WebGLRenderer: Texture marked for update but image is incomplete' );

    			} else {

    				uploadTexture( textureProperties, texture, slot );
    				return;

    			}

    		}

    		state.activeTexture( 33984 + slot );
    		state.bindTexture( 3553, textureProperties.__webglTexture );

    	}

    	function setTexture2DArray( texture, slot ) {

    		const textureProperties = properties.get( texture );

    		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

    			uploadTexture( textureProperties, texture, slot );
    			return;

    		}

    		state.activeTexture( 33984 + slot );
    		state.bindTexture( 35866, textureProperties.__webglTexture );

    	}

    	function setTexture3D( texture, slot ) {

    		const textureProperties = properties.get( texture );

    		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

    			uploadTexture( textureProperties, texture, slot );
    			return;

    		}

    		state.activeTexture( 33984 + slot );
    		state.bindTexture( 32879, textureProperties.__webglTexture );

    	}

    	function setTextureCube( texture, slot ) {

    		const textureProperties = properties.get( texture );

    		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

    			uploadCubeTexture( textureProperties, texture, slot );
    			return;

    		}

    		state.activeTexture( 33984 + slot );
    		state.bindTexture( 34067, textureProperties.__webglTexture );

    	}

    	const wrappingToGL = {
    		[ RepeatWrapping ]: 10497,
    		[ ClampToEdgeWrapping ]: 33071,
    		[ MirroredRepeatWrapping ]: 33648
    	};

    	const filterToGL = {
    		[ NearestFilter ]: 9728,
    		[ NearestMipmapNearestFilter ]: 9984,
    		[ NearestMipmapLinearFilter ]: 9986,

    		[ LinearFilter ]: 9729,
    		[ LinearMipmapNearestFilter ]: 9985,
    		[ LinearMipmapLinearFilter ]: 9987
    	};

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

    	function initTexture( textureProperties, texture ) {

    		if ( textureProperties.__webglInit === undefined ) {

    			textureProperties.__webglInit = true;

    			texture.addEventListener( 'dispose', onTextureDispose );

    			textureProperties.__webglTexture = _gl.createTexture();

    			info.memory.textures ++;

    		}

    	}

    	function uploadTexture( textureProperties, texture, slot ) {

    		let textureType = 3553;

    		if ( texture.isDataTexture2DArray ) textureType = 35866;
    		if ( texture.isDataTexture3D ) textureType = 32879;

    		initTexture( textureProperties, texture );

    		state.activeTexture( 33984 + slot );
    		state.bindTexture( textureType, textureProperties.__webglTexture );

    		_gl.pixelStorei( 37440, texture.flipY );
    		_gl.pixelStorei( 37441, texture.premultiplyAlpha );
    		_gl.pixelStorei( 3317, texture.unpackAlignment );
    		_gl.pixelStorei( 37443, 0 );

    		const needsPowerOfTwo = textureNeedsPowerOfTwo( texture ) && isPowerOfTwo$1( texture.image ) === false;
    		const image = resizeImage( texture.image, needsPowerOfTwo, false, maxTextureSize );

    		const supportsMips = isPowerOfTwo$1( image ) || isWebGL2,
    			glFormat = utils.convert( texture.format );

    		let glType = utils.convert( texture.type ),
    			glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType, texture.encoding );

    		setTextureParameters( textureType, texture, supportsMips );

    		let mipmap;
    		const mipmaps = texture.mipmaps;

    		if ( texture.isDepthTexture ) {

    			// populate depth texture with dummy data

    			glInternalFormat = 6402;

    			if ( isWebGL2 ) {

    				if ( texture.type === FloatType ) {

    					glInternalFormat = 36012;

    				} else if ( texture.type === UnsignedIntType ) {

    					glInternalFormat = 33190;

    				} else if ( texture.type === UnsignedInt248Type ) {

    					glInternalFormat = 35056;

    				} else {

    					glInternalFormat = 33189; // WebGL2 requires sized internalformat for glTexImage2D

    				}

    			} else {

    				if ( texture.type === FloatType ) {

    					console.error( 'WebGLRenderer: Floating point depth texture requires WebGL2.' );

    				}

    			}

    			// validation checks for WebGL 1

    			if ( texture.format === DepthFormat && glInternalFormat === 6402 ) {

    				// The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
    				// DEPTH_COMPONENT and type is not UNSIGNED_SHORT or UNSIGNED_INT
    				// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
    				if ( texture.type !== UnsignedShortType && texture.type !== UnsignedIntType ) {

    					console.warn( 'THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.' );

    					texture.type = UnsignedShortType;
    					glType = utils.convert( texture.type );

    				}

    			}

    			if ( texture.format === DepthStencilFormat && glInternalFormat === 6402 ) {

    				// Depth stencil textures need the DEPTH_STENCIL internal format
    				// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
    				glInternalFormat = 34041;

    				// The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
    				// DEPTH_STENCIL and type is not UNSIGNED_INT_24_8_WEBGL.
    				// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
    				if ( texture.type !== UnsignedInt248Type ) {

    					console.warn( 'THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.' );

    					texture.type = UnsignedInt248Type;
    					glType = utils.convert( texture.type );

    				}

    			}

    			//

    			state.texImage2D( 3553, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, null );

    		} else if ( texture.isDataTexture ) {

    			// use manually created mipmaps if available
    			// if there are no manual mipmaps
    			// set 0 level mipmap and then use GL to generate other mipmap levels

    			if ( mipmaps.length > 0 && supportsMips ) {

    				for ( let i = 0, il = mipmaps.length; i < il; i ++ ) {

    					mipmap = mipmaps[ i ];
    					state.texImage2D( 3553, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

    				}

    				texture.generateMipmaps = false;

    			} else {

    				state.texImage2D( 3553, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, image.data );

    			}

    		} else if ( texture.isCompressedTexture ) {

    			for ( let i = 0, il = mipmaps.length; i < il; i ++ ) {

    				mipmap = mipmaps[ i ];

    				if ( texture.format !== RGBAFormat && texture.format !== RGBFormat ) {

    					if ( glFormat !== null ) {

    						state.compressedTexImage2D( 3553, i, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data );

    					} else {

    						console.warn( 'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()' );

    					}

    				} else {

    					state.texImage2D( 3553, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

    				}

    			}

    		} else if ( texture.isDataTexture2DArray ) {

    			state.texImage3D( 35866, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data );

    		} else if ( texture.isDataTexture3D ) {

    			state.texImage3D( 32879, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data );

    		} else {

    			// regular Texture (image, video, canvas)

    			// use manually created mipmaps if available
    			// if there are no manual mipmaps
    			// set 0 level mipmap and then use GL to generate other mipmap levels

    			const levels = getMipLevels( texture, image, supportsMips );
    			const useTexStorage = ( isWebGL2 && texture.isVideoTexture !== true );
    			const allocateMemory = ( textureProperties.__version === undefined );

    			if ( mipmaps.length > 0 && supportsMips ) {

    				if ( useTexStorage && allocateMemory ) {

    					state.texStorage2D( 3553, levels, glInternalFormat, mipmaps[ 0 ].width, mipmaps[ 0 ].height );

    				}

    				for ( let i = 0, il = mipmaps.length; i < il; i ++ ) {

    					mipmap = mipmaps[ i ];

    					if ( useTexStorage ) {

    						state.texSubImage2D( 3553, i, 0, 0, glFormat, glType, mipmap );

    					} else {

    						state.texImage2D( 3553, i, glInternalFormat, glFormat, glType, mipmap );

    					}

    				}

    				texture.generateMipmaps = false;

    			} else {

    				if ( useTexStorage ) {

    					if ( allocateMemory ) {

    						state.texStorage2D( 3553, levels, glInternalFormat, image.width, image.height );

    					}

    					state.texSubImage2D( 3553, 0, 0, 0, glFormat, glType, image );

    				} else {

    					state.texImage2D( 3553, 0, glInternalFormat, glFormat, glType, image );

    				}

    			}

    		}

    		if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

    			generateMipmap( textureType );

    		}

    		textureProperties.__version = texture.version;

    		if ( texture.onUpdate ) texture.onUpdate( texture );

    	}

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

    	// Render targets

    	// Setup storage for target texture and bind it to correct framebuffer
    	function setupFrameBufferTexture( framebuffer, renderTarget, texture, attachment, textureTarget ) {

    		const glFormat = utils.convert( texture.format );
    		const glType = utils.convert( texture.type );
    		const glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType, texture.encoding );
    		const renderTargetProperties = properties.get( renderTarget );

    		if ( ! renderTargetProperties.__hasExternalTextures ) {

    			if ( textureTarget === 32879 || textureTarget === 35866 ) {

    				state.texImage3D( textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, renderTarget.depth, 0, glFormat, glType, null );

    			} else {

    				state.texImage2D( textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );

    			}

    		}

    		state.bindFramebuffer( 36160, framebuffer );
    		if ( renderTarget.useRenderToTexture ) {

    			MultisampledRenderToTextureExtension.framebufferTexture2DMultisampleEXT( 36160, attachment, textureTarget, properties.get( texture ).__webglTexture, 0, getRenderTargetSamples( renderTarget ) );

    		} else {

    			_gl.framebufferTexture2D( 36160, attachment, textureTarget, properties.get( texture ).__webglTexture, 0 );

    		}

    		state.bindFramebuffer( 36160, null );

    	}


    	// Setup storage for internal depth/stencil buffers and bind to correct framebuffer
    	function setupRenderBufferStorage( renderbuffer, renderTarget, isMultisample ) {

    		_gl.bindRenderbuffer( 36161, renderbuffer );

    		if ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {

    			let glInternalFormat = 33189;

    			if ( isMultisample || renderTarget.useRenderToTexture ) {

    				const depthTexture = renderTarget.depthTexture;

    				if ( depthTexture && depthTexture.isDepthTexture ) {

    					if ( depthTexture.type === FloatType ) {

    						glInternalFormat = 36012;

    					} else if ( depthTexture.type === UnsignedIntType ) {

    						glInternalFormat = 33190;

    					}

    				}

    				const samples = getRenderTargetSamples( renderTarget );

    				if ( renderTarget.useRenderToTexture ) {

    					MultisampledRenderToTextureExtension.renderbufferStorageMultisampleEXT( 36161, samples, glInternalFormat, renderTarget.width, renderTarget.height );

    				} else {

    					_gl.renderbufferStorageMultisample( 36161, samples, glInternalFormat, renderTarget.width, renderTarget.height );

    				}

    			} else {

    				_gl.renderbufferStorage( 36161, glInternalFormat, renderTarget.width, renderTarget.height );

    			}

    			_gl.framebufferRenderbuffer( 36160, 36096, 36161, renderbuffer );

    		} else if ( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

    			const samples = getRenderTargetSamples( renderTarget );

    			if ( isMultisample && renderTarget.useRenderbuffer ) {

    				_gl.renderbufferStorageMultisample( 36161, samples, 35056, renderTarget.width, renderTarget.height );

    			} else if ( renderTarget.useRenderToTexture ) {

    				MultisampledRenderToTextureExtension.renderbufferStorageMultisampleEXT( 36161, samples, 35056, renderTarget.width, renderTarget.height );

    			} else {

    				_gl.renderbufferStorage( 36161, 34041, renderTarget.width, renderTarget.height );

    			}


    			_gl.framebufferRenderbuffer( 36160, 33306, 36161, renderbuffer );

    		} else {

    			// Use the first texture for MRT so far
    			const texture = renderTarget.isWebGLMultipleRenderTargets === true ? renderTarget.texture[ 0 ] : renderTarget.texture;

    			const glFormat = utils.convert( texture.format );
    			const glType = utils.convert( texture.type );
    			const glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType, texture.encoding );
    			const samples = getRenderTargetSamples( renderTarget );

    			if ( isMultisample && renderTarget.useRenderbuffer ) {

    				_gl.renderbufferStorageMultisample( 36161, samples, glInternalFormat, renderTarget.width, renderTarget.height );

    			} else if ( renderTarget.useRenderToTexture ) {

    				MultisampledRenderToTextureExtension.renderbufferStorageMultisampleEXT( 36161, samples, glInternalFormat, renderTarget.width, renderTarget.height );

    			} else {

    				_gl.renderbufferStorage( 36161, glInternalFormat, renderTarget.width, renderTarget.height );

    			}

    		}

    		_gl.bindRenderbuffer( 36161, null );

    	}

    	// Setup resources for a Depth Texture for a FBO (needs an extension)
    	function setupDepthTexture( framebuffer, renderTarget ) {

    		const isCube = ( renderTarget && renderTarget.isWebGLCubeRenderTarget );
    		if ( isCube ) throw new Error( 'Depth Texture with cube render targets is not supported' );

    		state.bindFramebuffer( 36160, framebuffer );

    		if ( ! ( renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture ) ) {

    			throw new Error( 'renderTarget.depthTexture must be an instance of THREE.DepthTexture' );

    		}

    		// upload an empty depth texture with framebuffer size
    		if ( ! properties.get( renderTarget.depthTexture ).__webglTexture ||
    				renderTarget.depthTexture.image.width !== renderTarget.width ||
    				renderTarget.depthTexture.image.height !== renderTarget.height ) {

    			renderTarget.depthTexture.image.width = renderTarget.width;
    			renderTarget.depthTexture.image.height = renderTarget.height;
    			renderTarget.depthTexture.needsUpdate = true;

    		}

    		setTexture2D( renderTarget.depthTexture, 0 );

    		const webglDepthTexture = properties.get( renderTarget.depthTexture ).__webglTexture;
    		const samples = getRenderTargetSamples( renderTarget );

    		if ( renderTarget.depthTexture.format === DepthFormat ) {

    			if ( renderTarget.useRenderToTexture ) {

    				MultisampledRenderToTextureExtension.framebufferTexture2DMultisampleEXT( 36160, 36096, 3553, webglDepthTexture, 0, samples );

    			} else {

    				_gl.framebufferTexture2D( 36160, 36096, 3553, webglDepthTexture, 0 );

    			}

    		} else if ( renderTarget.depthTexture.format === DepthStencilFormat ) {

    			if ( renderTarget.useRenderToTexture ) {

    				MultisampledRenderToTextureExtension.framebufferTexture2DMultisampleEXT( 36160, 33306, 3553, webglDepthTexture, 0, samples );

    			} else {

    				_gl.framebufferTexture2D( 36160, 33306, 3553, webglDepthTexture, 0 );

    			}

    		} else {

    			throw new Error( 'Unknown depthTexture format' );

    		}

    	}

    	// Setup GL resources for a non-texture depth buffer
    	function setupDepthRenderbuffer( renderTarget ) {

    		const renderTargetProperties = properties.get( renderTarget );
    		const isCube = ( renderTarget.isWebGLCubeRenderTarget === true );

    		if ( renderTarget.depthTexture && ! renderTargetProperties.__autoAllocateDepthBuffer ) {

    			if ( isCube ) throw new Error( 'target.depthTexture not supported in Cube render targets' );

    			setupDepthTexture( renderTargetProperties.__webglFramebuffer, renderTarget );

    		} else {

    			if ( isCube ) {

    				renderTargetProperties.__webglDepthbuffer = [];

    				for ( let i = 0; i < 6; i ++ ) {

    					state.bindFramebuffer( 36160, renderTargetProperties.__webglFramebuffer[ i ] );
    					renderTargetProperties.__webglDepthbuffer[ i ] = _gl.createRenderbuffer();
    					setupRenderBufferStorage( renderTargetProperties.__webglDepthbuffer[ i ], renderTarget, false );

    				}

    			} else {

    				state.bindFramebuffer( 36160, renderTargetProperties.__webglFramebuffer );
    				renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
    				setupRenderBufferStorage( renderTargetProperties.__webglDepthbuffer, renderTarget, false );

    			}

    		}

    		state.bindFramebuffer( 36160, null );

    	}

    	// rebind framebuffer with external textures
    	function rebindTextures( renderTarget, colorTexture, depthTexture ) {

    		const renderTargetProperties = properties.get( renderTarget );

    		if ( colorTexture !== undefined ) {

    			setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer, renderTarget, renderTarget.texture, 36064, 3553 );

    		}

    		if ( depthTexture !== undefined ) {

    			setupDepthRenderbuffer( renderTarget );

    		}

    	}

    	// Set up GL resources for the render target
    	function setupRenderTarget( renderTarget ) {

    		const texture = renderTarget.texture;

    		const renderTargetProperties = properties.get( renderTarget );
    		const textureProperties = properties.get( texture );

    		renderTarget.addEventListener( 'dispose', onRenderTargetDispose );

    		if ( renderTarget.isWebGLMultipleRenderTargets !== true ) {

    			if ( textureProperties.__webglTexture === undefined ) {

    				textureProperties.__webglTexture = _gl.createTexture();

    			}

    			textureProperties.__version = texture.version;
    			info.memory.textures ++;

    		}

    		const isCube = ( renderTarget.isWebGLCubeRenderTarget === true );
    		const isMultipleRenderTargets = ( renderTarget.isWebGLMultipleRenderTargets === true );
    		const isRenderTarget3D = texture.isDataTexture3D || texture.isDataTexture2DArray;
    		const supportsMips = isPowerOfTwo$1( renderTarget ) || isWebGL2;

    		// Handles WebGL2 RGBFormat fallback - #18858

    		if ( isWebGL2 && texture.format === RGBFormat && ( texture.type === FloatType || texture.type === HalfFloatType ) ) {

    			texture.format = RGBAFormat;

    			console.warn( 'THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.' );

    		}

    		// Setup framebuffer

    		if ( isCube ) {

    			renderTargetProperties.__webglFramebuffer = [];

    			for ( let i = 0; i < 6; i ++ ) {

    				renderTargetProperties.__webglFramebuffer[ i ] = _gl.createFramebuffer();

    			}

    		} else {

    			renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();

    			if ( isMultipleRenderTargets ) {

    				if ( capabilities.drawBuffers ) {

    					const textures = renderTarget.texture;

    					for ( let i = 0, il = textures.length; i < il; i ++ ) {

    						const attachmentProperties = properties.get( textures[ i ] );

    						if ( attachmentProperties.__webglTexture === undefined ) {

    							attachmentProperties.__webglTexture = _gl.createTexture();

    							info.memory.textures ++;

    						}

    					}

    				} else {

    					console.warn( 'THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.' );

    				}

    			} else if ( renderTarget.useRenderbuffer ) {

    				if ( isWebGL2 ) {

    					renderTargetProperties.__webglMultisampledFramebuffer = _gl.createFramebuffer();
    					renderTargetProperties.__webglColorRenderbuffer = _gl.createRenderbuffer();

    					_gl.bindRenderbuffer( 36161, renderTargetProperties.__webglColorRenderbuffer );

    					const glFormat = utils.convert( texture.format );
    					const glType = utils.convert( texture.type );
    					const glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType, texture.encoding );
    					const samples = getRenderTargetSamples( renderTarget );
    					_gl.renderbufferStorageMultisample( 36161, samples, glInternalFormat, renderTarget.width, renderTarget.height );

    					state.bindFramebuffer( 36160, renderTargetProperties.__webglMultisampledFramebuffer );
    					_gl.framebufferRenderbuffer( 36160, 36064, 36161, renderTargetProperties.__webglColorRenderbuffer );
    					_gl.bindRenderbuffer( 36161, null );

    					if ( renderTarget.depthBuffer ) {

    						renderTargetProperties.__webglDepthRenderbuffer = _gl.createRenderbuffer();
    						setupRenderBufferStorage( renderTargetProperties.__webglDepthRenderbuffer, renderTarget, true );

    					}

    					state.bindFramebuffer( 36160, null );


    				} else {

    					console.warn( 'THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.' );

    				}

    			}

    		}

    		// Setup color buffer

    		if ( isCube ) {

    			state.bindTexture( 34067, textureProperties.__webglTexture );
    			setTextureParameters( 34067, texture, supportsMips );

    			for ( let i = 0; i < 6; i ++ ) {

    				setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer[ i ], renderTarget, texture, 36064, 34069 + i );

    			}

    			if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

    				generateMipmap( 34067 );

    			}

    			state.unbindTexture();

    		} else if ( isMultipleRenderTargets ) {

    			const textures = renderTarget.texture;

    			for ( let i = 0, il = textures.length; i < il; i ++ ) {

    				const attachment = textures[ i ];
    				const attachmentProperties = properties.get( attachment );

    				state.bindTexture( 3553, attachmentProperties.__webglTexture );
    				setTextureParameters( 3553, attachment, supportsMips );
    				setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer, renderTarget, attachment, 36064 + i, 3553 );

    				if ( textureNeedsGenerateMipmaps( attachment, supportsMips ) ) {

    					generateMipmap( 3553 );

    				}

    			}

    			state.unbindTexture();

    		} else {

    			let glTextureType = 3553;

    			if ( isRenderTarget3D ) {

    				// Render targets containing layers, i.e: Texture 3D and 2d arrays

    				if ( isWebGL2 ) {

    					const isTexture3D = texture.isDataTexture3D;
    					glTextureType = isTexture3D ? 32879 : 35866;

    				} else {

    					console.warn( 'THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.' );

    				}

    			}

    			state.bindTexture( glTextureType, textureProperties.__webglTexture );
    			setTextureParameters( glTextureType, texture, supportsMips );
    			setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer, renderTarget, texture, 36064, glTextureType );

    			if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

    				generateMipmap( glTextureType );

    			}

    			state.unbindTexture();

    		}

    		// Setup depth and stencil buffers

    		if ( renderTarget.depthBuffer ) {

    			setupDepthRenderbuffer( renderTarget );

    		}

    	}

    	function updateRenderTargetMipmap( renderTarget ) {

    		const supportsMips = isPowerOfTwo$1( renderTarget ) || isWebGL2;

    		const textures = renderTarget.isWebGLMultipleRenderTargets === true ? renderTarget.texture : [ renderTarget.texture ];

    		for ( let i = 0, il = textures.length; i < il; i ++ ) {

    			const texture = textures[ i ];

    			if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

    				const target = renderTarget.isWebGLCubeRenderTarget ? 34067 : 3553;
    				const webglTexture = properties.get( texture ).__webglTexture;

    				state.bindTexture( target, webglTexture );
    				generateMipmap( target );
    				state.unbindTexture();

    			}

    		}

    	}

    	function updateMultisampleRenderTarget( renderTarget ) {

    		if ( renderTarget.useRenderbuffer ) {

    			if ( isWebGL2 ) {

    				const width = renderTarget.width;
    				const height = renderTarget.height;
    				let mask = 16384;
    				const invalidationArray = [ 36064 ];
    				const depthStyle = renderTarget.stencilBuffer ? 33306 : 36096;

    				if ( renderTarget.depthBuffer ) {

    					invalidationArray.push( depthStyle );

    				}

    				if ( ! renderTarget.ignoreDepthForMultisampleCopy ) {

    					if ( renderTarget.depthBuffer ) mask |= 256;
    					if ( renderTarget.stencilBuffer ) mask |= 1024;

    				}

    				const renderTargetProperties = properties.get( renderTarget );

    				state.bindFramebuffer( 36008, renderTargetProperties.__webglMultisampledFramebuffer );
    				state.bindFramebuffer( 36009, renderTargetProperties.__webglFramebuffer );

    				if ( renderTarget.ignoreDepthForMultisampleCopy ) {

    					_gl.invalidateFramebuffer( 36008, [ depthStyle ] );
    					_gl.invalidateFramebuffer( 36009, [ depthStyle ] );

    				}

    				_gl.blitFramebuffer( 0, 0, width, height, 0, 0, width, height, mask, 9728 );
    				_gl.invalidateFramebuffer( 36008, invalidationArray );

    				state.bindFramebuffer( 36008, null );
    				state.bindFramebuffer( 36009, renderTargetProperties.__webglMultisampledFramebuffer );

    			} else {

    				console.warn( 'THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.' );

    			}

    		}

    	}

    	function getRenderTargetSamples( renderTarget ) {

    		return ( isWebGL2 && ( renderTarget.useRenderbuffer || renderTarget.useRenderToTexture ) ) ?
    			Math.min( maxSamples, renderTarget.samples ) : 0;

    	}

    	function updateVideoTexture( texture ) {

    		const frame = info.render.frame;

    		// Check the last frame we updated the VideoTexture

    		if ( _videoTextures.get( texture ) !== frame ) {

    			_videoTextures.set( texture, frame );
    			texture.update();

    		}

    	}

    	// backwards compatibility

    	let warnedTexture2D = false;
    	let warnedTextureCube = false;

    	function safeSetTexture2D( texture, slot ) {

    		if ( texture && texture.isWebGLRenderTarget ) {

    			if ( warnedTexture2D === false ) {

    				console.warn( 'THREE.WebGLTextures.safeSetTexture2D: don\'t use render targets as textures. Use their .texture property instead.' );
    				warnedTexture2D = true;

    			}

    			texture = texture.texture;

    		}

    		setTexture2D( texture, slot );

    	}

    	function safeSetTextureCube( texture, slot ) {

    		if ( texture && texture.isWebGLCubeRenderTarget ) {

    			if ( warnedTextureCube === false ) {

    				console.warn( 'THREE.WebGLTextures.safeSetTextureCube: don\'t use cube render targets as textures. Use their .texture property instead.' );
    				warnedTextureCube = true;

    			}

    			texture = texture.texture;

    		}


    		setTextureCube( texture, slot );

    	}

    	//

    	this.allocateTextureUnit = allocateTextureUnit;
    	this.resetTextureUnits = resetTextureUnits;

    	this.setTexture2D = setTexture2D;
    	this.setTexture2DArray = setTexture2DArray;
    	this.setTexture3D = setTexture3D;
    	this.setTextureCube = setTextureCube;
    	this.rebindTextures = rebindTextures;
    	this.setupRenderTarget = setupRenderTarget;
    	this.updateRenderTargetMipmap = updateRenderTargetMipmap;
    	this.updateMultisampleRenderTarget = updateMultisampleRenderTarget;
    	this.setupDepthRenderbuffer = setupDepthRenderbuffer;
    	this.setupFrameBufferTexture = setupFrameBufferTexture;

    	this.safeSetTexture2D = safeSetTexture2D;
    	this.safeSetTextureCube = safeSetTextureCube;

    }