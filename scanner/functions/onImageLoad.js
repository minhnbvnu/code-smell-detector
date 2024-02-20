function onImageLoad() {

    			removeEventListeners();

    			Cache.add( url, this );

    			if ( onLoad ) onLoad( this );

    			scope.manager.itemEnd( url );

    		}