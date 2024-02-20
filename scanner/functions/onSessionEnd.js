function onSessionEnd() {

    			inputSourcesMap.forEach( function ( controller, inputSource ) {

    				controller.disconnect( inputSource );

    			} );

    			inputSourcesMap.clear();

    			_currentDepthNear = null;
    			_currentDepthFar = null;

    			// restore framebuffer/rendering state

    			renderer.setRenderTarget( initialRenderTarget );

    			glBaseLayer = null;
    			glProjLayer = null;
    			glBinding = null;
    			session = null;
    			newRenderTarget = null;

    			//

    			animation.stop();

    			scope.isPresenting = false;

    			scope.dispatchEvent( { type: 'sessionend' } );

    		}