function bindVertexArrayObject( vao ) {

    		if ( capabilities.isWebGL2 ) return gl.bindVertexArray( vao );

    		return extension.bindVertexArrayOES( vao );

    	}