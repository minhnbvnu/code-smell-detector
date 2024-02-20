function onImageError( event ) {

    			removeEventListeners();

    			if ( onError ) onError( event );

    			scope.manager.itemError( url );
    			scope.manager.itemEnd( url );

    		}