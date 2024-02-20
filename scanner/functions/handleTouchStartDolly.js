function handleTouchStartDolly() {

				const dx = pointers[ 0 ].pageX - pointers[ 1 ].pageX;
				const dy = pointers[ 0 ].pageY - pointers[ 1 ].pageY;
				const distance = Math.sqrt( dx * dx + dy * dy );
				dollyStart.set( 0, distance );

			}