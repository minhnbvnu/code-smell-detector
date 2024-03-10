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