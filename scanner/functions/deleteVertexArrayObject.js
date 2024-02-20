function deleteVertexArrayObject( vao ) {

    		if ( capabilities.isWebGL2 ) return gl.deleteVertexArray( vao );

    		return extension.deleteVertexArrayOES( vao );

    	}