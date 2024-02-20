function removePointer( event ) {

				delete pointerPositions[ event.pointerId ];

				for ( let i = 0; i < pointers.length; i ++ ) {

					if ( pointers[ i ].pointerId == event.pointerId ) {

						pointers.splice( i, 1 );
						return;

					}

				}

			}