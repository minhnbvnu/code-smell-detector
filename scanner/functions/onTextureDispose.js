function onTextureDispose( event ) {

    		const texture = event.target;

    		texture.removeEventListener( 'dispose', onTextureDispose );

    		deallocateTexture( texture );

    		if ( texture.isVideoTexture ) {

    			_videoTextures.delete( texture );

    		}

    		info.memory.textures --;

    	}