function texSubImage3D() {

		try {

			gl.texSubImage3D.apply( gl, arguments );

		} catch ( error ) {

			console.error( 'THREE.WebGLState:', error );

		}

	}