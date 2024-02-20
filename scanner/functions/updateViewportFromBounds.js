function updateViewportFromBounds( viewport, bounds ) {

			if ( bounds !== null && bounds.length === 4 ) {

				viewport.set( bounds[ 0 ] * renderWidth, bounds[ 1 ] * renderHeight, bounds[ 2 ] * renderWidth, bounds[ 3 ] * renderHeight );

			}

		}