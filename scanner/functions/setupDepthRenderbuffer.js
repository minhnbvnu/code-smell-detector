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