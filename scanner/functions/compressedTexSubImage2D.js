function compressedTexSubImage2D() {

		try {

			gl.compressedTexSubImage2D.apply( gl, arguments );

		} catch ( error ) {

			console.error( 'THREE.WebGLState:', error );

		}

	}