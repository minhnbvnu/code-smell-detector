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