function activeTexture( webglSlot ) {

    		if ( webglSlot === undefined ) webglSlot = 33984 + maxTextures - 1;

    		if ( currentTextureSlot !== webglSlot ) {

    			gl.activeTexture( webglSlot );
    			currentTextureSlot = webglSlot;

    		}

    	}