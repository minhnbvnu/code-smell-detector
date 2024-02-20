function handleTouchStartRotate() {

				if ( pointers.length === 1 ) {

					rotateStart.set( pointers[ 0 ].pageX, pointers[ 0 ].pageY );

				} else {

					const x = 0.5 * ( pointers[ 0 ].pageX + pointers[ 1 ].pageX );
					const y = 0.5 * ( pointers[ 0 ].pageY + pointers[ 1 ].pageY );
					rotateStart.set( x, y );

				}

			}