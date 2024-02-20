function isCubeTextureComplete( image ) {

    		let count = 0;
    		const length = 6;

    		for ( let i = 0; i < length; i ++ ) {

    			if ( image[ i ] !== undefined ) count ++;

    		}

    		return count === length;


    	}