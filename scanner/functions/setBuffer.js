function setBuffer( buffer ) {

    	if ( _prevBuffer ) {

    		bufferStack.push( _prevBuffer );

    	}

    	_prevBuffer = buffer;
    	_float32Array = new Float32Array( buffer );
    	_uint16Array = new Uint16Array( buffer );
    	_uint32Array = new Uint32Array( buffer );

    }