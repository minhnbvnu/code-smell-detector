function createShaderProgram() {
		// create vertex shader
		const vertexSrc = [
			'attribute vec4 position;',
			'void main() {',
			'	/* already in normalized coordinates, so just pass through */',
			'	gl_Position = position;',
			'}'
		].join('');
		const vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertexShader, vertexSrc);
		gl.compileShader(vertexShader);

		if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
			window.console && console.log(
				`Vertex shader failed to compile. Log: ${gl.getShaderInfoLog(vertexShader)}`
			);
		}

		// create fragment shader
		const fragmentSrc = [
			'precision mediump float;',
			'void main() {',
			'	gl_FragColor = vec4(0, 0, 0, 1);',
			'}'
		].join('');
		const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragmentShader, fragmentSrc);
		gl.compileShader(fragmentShader);

		if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
			window.console && console.log(
				`Fragment shader failed to compile. Log: ${gl.getShaderInfoLog(fragmentShader)}`
			);
		}

		// link shaders to create our program
		const program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		gl.useProgram(program);

		return program;
	}