function texStorage3D() {

		try {

			gl.texStorage3D.apply( gl, arguments );

		} catch ( error ) {

			console.error( 'THREE.WebGLState:', error );

		}

	}