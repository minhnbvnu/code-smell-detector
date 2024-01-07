function initFiguresGL() {
    generateGL();
    const canvas = currentCanvas;
    currentCanvas = null;
    const gl = currentGL;
    currentGL = null;
    const vertexShader = createVertexShader(gl, figuresVertexShaderCode);
    const fragmentShader = createFragmentShader(gl, figuresFragmentShaderCode);
    const program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);
    const cache = {};
    cache.gl = gl;
    cache.canvas = canvas;
    cache.resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    cache.scaleLocation = gl.getUniformLocation(program, "u_scale");
    cache.offsetLocation = gl.getUniformLocation(program, "u_offset");
    cache.positionLocation = gl.getAttribLocation(program, "a_position");
    cache.colorLocation = gl.getAttribLocation(program, "a_color");
    figuresCache = cache;
  }