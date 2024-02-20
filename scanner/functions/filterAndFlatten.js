function filterAndFlatten( scene ) {

    			const result = [];

    			scene.traverse( function ( object ) {

    				if ( object.isCSS2DObject ) result.push( object );

    			} );

    			return result;

    		}