function handleTouchMoveDolly( event ) {

				const position = getSecondPointerPosition( event );
				const dx = event.pageX - position.x;
				const dy = event.pageY - position.y;
				const distance = Math.sqrt( dx * dx + dy * dy );
				dollyEnd.set( 0, distance );
				dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );
				dollyOut( dollyDelta.y );
				dollyStart.copy( dollyEnd );

			}