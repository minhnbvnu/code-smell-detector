function initWebGL(canvas) {
		try {
			gl = canvas.getContext('webgl', { antialias: false });
		} catch (error) {
			show_error_message("Failed to get WebGL context. You may need to refresh the web page, or restart your computer.", error);
			return;
		}

		if (!gl) {
			show_error_message("Failed to get WebGL context. You may need to refresh the web page, or restart your computer.");
			return;
		}

		window.WEBGL_lose_context = gl.getExtension("WEBGL_lose_context");
		
		const program = createShaderProgram();
		positionLoc = gl.getAttribLocation(program, 'position');
		gl.enableVertexAttribArray(positionLoc);
	}