function updateVideoTexture( texture ) {

    		const frame = info.render.frame;

    		// Check the last frame we updated the VideoTexture

    		if ( _videoTextures.get( texture ) !== frame ) {

    			_videoTextures.set( texture, frame );
    			texture.update();

    		}

    	}