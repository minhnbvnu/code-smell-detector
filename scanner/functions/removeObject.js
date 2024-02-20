function removeObject( object ) {

		if ( object instanceof THREE.Mesh  ||
			 object instanceof THREE.PointCloud ||
			 object instanceof THREE.Line ) {

			delete _webglObjects[ object.id ];

		} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {

			removeInstances( _webglObjectsImmediate, object );

		}

		delete object.__webglInit;
		delete object._modelViewMatrix;
		delete object._normalMatrix;

		delete object.__webglActive;

	}