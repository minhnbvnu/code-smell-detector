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