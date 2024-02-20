function rebindTextures( renderTarget, colorTexture, depthTexture ) {

    		const renderTargetProperties = properties.get( renderTarget );

    		if ( colorTexture !== undefined ) {

    			setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer, renderTarget, renderTarget.texture, 36064, 3553 );

    		}

    		if ( depthTexture !== undefined ) {

    			setupDepthRenderbuffer( renderTarget );

    		}

    	}