function scissor( scissor ) {

    		if ( currentScissor.equals( scissor ) === false ) {

    			gl.scissor( scissor.x, scissor.y, scissor.z, scissor.w );
    			currentScissor.copy( scissor );

    		}

    	}