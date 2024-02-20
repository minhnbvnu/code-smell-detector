function removeEventListeners() {

    			image.removeEventListener( 'load', onImageLoad, false );
    			image.removeEventListener( 'error', onImageError, false );

    		}