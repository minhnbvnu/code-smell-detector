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