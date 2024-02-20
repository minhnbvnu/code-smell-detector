function vertexAttribPointer( index, size, type, normalized, stride, offset ) {

    		if ( capabilities.isWebGL2 === true && ( type === 5124 || type === 5125 ) ) {

    			gl.vertexAttribIPointer( index, size, type, stride, offset );

    		} else {

    			gl.vertexAttribPointer( index, size, type, normalized, stride, offset );

    		}

    	}