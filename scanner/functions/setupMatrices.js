function setupMatrices ( object, camera ) {

		object._modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, object.matrixWorld );
		object._normalMatrix.getNormalMatrix( object._modelViewMatrix );

	}