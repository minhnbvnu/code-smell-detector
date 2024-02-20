function renderObject( object, scene, camera ) {

    			if ( object.isCSS2DObject ) {

    				object.onBeforeRender( _this, scene, camera );

    				_vector.setFromMatrixPosition( object.matrixWorld );
    				_vector.applyMatrix4( _viewProjectionMatrix );

    				const element = object.element;

    				if ( /apple/i.test( navigator.vendor ) ) {

    					// https://github.com/mrdoob/three.js/issues/21415
    					element.style.transform = 'translate(-50%,-50%) translate(' + Math.round( _vector.x * _widthHalf + _widthHalf ) + 'px,' + Math.round( - _vector.y * _heightHalf + _heightHalf ) + 'px)';

    				} else {

    					element.style.transform = 'translate(-50%,-50%) translate(' + ( _vector.x * _widthHalf + _widthHalf ) + 'px,' + ( - _vector.y * _heightHalf + _heightHalf ) + 'px)';

    				}

    				element.style.display = ( object.visible && _vector.z >= - 1 && _vector.z <= 1 ) ? '' : 'none';

    				const objectData = {
    					distanceToCameraSquared: getDistanceToSquared( camera, object )
    				};

    				cache.objects.set( object, objectData );

    				if ( element.parentNode !== domElement ) {

    					domElement.appendChild( element );

    				}

    				object.onAfterRender( _this, scene, camera );

    			}

    			for ( let i = 0, l = object.children.length; i < l; i ++ ) {

    				renderObject( object.children[ i ], scene, camera );

    			}

    		}