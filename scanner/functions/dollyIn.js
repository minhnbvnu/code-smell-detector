function dollyIn( dollyScale ) {

				if ( scope.object.isPerspectiveCamera ) {

					scale *= dollyScale;

				} else if ( scope.object.isOrthographicCamera ) {

					scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;

				} else {

					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
					scope.enableZoom = false;

				}

			}