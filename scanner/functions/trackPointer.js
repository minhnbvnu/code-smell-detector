function trackPointer( event ) {

				let position = pointerPositions[ event.pointerId ];

				if ( position === undefined ) {

					position = new THREE.Vector2();
					pointerPositions[ event.pointerId ] = position;

				}

				position.set( event.pageX, event.pageY );

			}