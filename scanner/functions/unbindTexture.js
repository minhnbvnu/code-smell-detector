function unbindTexture() {

    		const boundTexture = currentBoundTextures[ currentTextureSlot ];

    		if ( boundTexture !== undefined && boundTexture.type !== undefined ) {

    			gl.bindTexture( boundTexture.type, null );

    			boundTexture.type = undefined;
    			boundTexture.texture = undefined;

    		}

    	}