function mapTextureMapping( texture, mapping ) {

    		if ( mapping === EquirectangularReflectionMapping ) {

    			texture.mapping = CubeReflectionMapping;

    		} else if ( mapping === EquirectangularRefractionMapping ) {

    			texture.mapping = CubeRefractionMapping;

    		}

    		return texture;

    	}