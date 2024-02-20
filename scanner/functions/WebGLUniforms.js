function WebGLUniforms( gl, program ) {

    	this.seq = [];
    	this.map = {};

    	const n = gl.getProgramParameter( program, 35718 );

    	for ( let i = 0; i < n; ++ i ) {

    		const info = gl.getActiveUniform( program, i ),
    			addr = gl.getUniformLocation( program, info.name );

    		parseUniform( info, addr, this );

    	}

    }