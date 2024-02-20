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