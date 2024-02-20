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