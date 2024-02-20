function filterFallback( f ) {

    		if ( f === NearestFilter || f === NearestMipmapNearestFilter || f === NearestMipmapLinearFilter ) {

    			return 9728;

    		}

    		return 9729;

    	}