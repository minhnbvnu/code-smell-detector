function initFiguresGL() {
    var canvas, gl;

    generateGL();
    canvas = currentCanvas;
    currentCanvas = null;
    gl = currentGL;
    currentGL = null;

    // setup a GLSL program
    var vertexShader = createVertexShader(gl, figuresVertexShaderCode);
    var fragmentShader = createFragmentShader(gl, figuresFragmentShaderCode);
    var program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);

    var cache = {};
    cache.gl = gl;
    cache.canvas = canvas;
    cache.resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    cache.scaleLocation = gl.getUniformLocation(program, 'u_scale');
    cache.offsetLocation = gl.getUniformLocation(program, 'u_offset');
    cache.positionLocation = gl.getAttribLocation(program, 'a_position');
    cache.colorLocation = gl.getAttribLocation(program, 'a_color');

    figuresCache = cache;
  }