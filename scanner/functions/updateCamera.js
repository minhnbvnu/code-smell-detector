function updateCamera( camera, parent ) {

    			if ( parent === null ) {

    				camera.matrixWorld.copy( camera.matrix );

    			} else {

    				camera.matrixWorld.multiplyMatrices( parent.matrixWorld, camera.matrix );

    			}

    			camera.matrixWorldInverse.copy( camera.matrixWorld ).invert();

    		}