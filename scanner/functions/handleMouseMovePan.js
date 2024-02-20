function handleMouseMovePan( event ) {

				panEnd.set( event.clientX, event.clientY );
				panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );
				pan( panDelta.x, panDelta.y );
				panStart.copy( panEnd );
				scope.update();

			}