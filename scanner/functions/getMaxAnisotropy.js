function getMaxAnisotropy() {

    		if ( maxAnisotropy !== undefined ) return maxAnisotropy;

    		if ( extensions.has( 'EXT_texture_filter_anisotropic' ) === true ) {

    			const extension = extensions.get( 'EXT_texture_filter_anisotropic' );

    			maxAnisotropy = gl.getParameter( extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT );

    		} else {

    			maxAnisotropy = 0;

    		}

    		return maxAnisotropy;

    	}