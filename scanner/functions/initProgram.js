function initProgram(vertexShaderSource, fragmentShaderSource) {
			var vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
			var fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

			var program = gl.createProgram();
			gl.attachShader(program, vertexShader);
			gl.attachShader(program, fragmentShader);

			gl.linkProgram(program);
			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
				var err = gl.getProgramInfoLog(program);
				gl.deleteProgram(program);
				throw new Error('GL program linking failed: ' + err);
			}

			return program;
		}