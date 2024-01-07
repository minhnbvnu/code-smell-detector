function initSmaskGL() {
    generateGL();
    const canvas = currentCanvas;
    currentCanvas = null;
    const gl = currentGL;
    currentGL = null;
    const vertexShader = createVertexShader(gl, smaskVertexShaderCode);
    const fragmentShader = createFragmentShader(gl, smaskFragmentShaderCode);
    const program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);
    const cache = {};
    cache.gl = gl;
    cache.canvas = canvas;
    cache.resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    cache.positionLocation = gl.getAttribLocation(program, "a_position");
    cache.backdropLocation = gl.getUniformLocation(program, "u_backdrop");
    cache.subtypeLocation = gl.getUniformLocation(program, "u_subtype");
    const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    const texLayerLocation = gl.getUniformLocation(program, "u_image");
    const texMaskLocation = gl.getUniformLocation(program, "u_mask");
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(texLayerLocation, 0);
    gl.uniform1i(texMaskLocation, 1);
    smaskCache = cache;
  }