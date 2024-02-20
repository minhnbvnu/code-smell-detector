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