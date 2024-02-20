function zOrder( scene ) {

    			const sorted = filterAndFlatten( scene ).sort( function ( a, b ) {

    				const distanceA = cache.objects.get( a ).distanceToCameraSquared;
    				const distanceB = cache.objects.get( b ).distanceToCameraSquared;

    				return distanceA - distanceB;

    			} );

    			const zMax = sorted.length;

    			for ( let i = 0, l = sorted.length; i < l; i ++ ) {

    				sorted[ i ].element.style.zIndex = zMax - i;

    			}

    		}