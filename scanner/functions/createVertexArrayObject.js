function createVertexArrayObject() {

    		if ( capabilities.isWebGL2 ) return gl.createVertexArray();

    		return extension.createVertexArrayOES();

    	}