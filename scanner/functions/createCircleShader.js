function createCircleShader(gl, viewportArray) {
  var vs = gl.createShader(gl.VERTEX_SHADER);
  var fs = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vs, VERTEX_SHADER);
  gl.shaderSource(fs, FRAGMENT_SHADER);

  gl.compileShader(vs);
  gl.compileShader(fs);

  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    console.error('error compiling VS shaders:', gl.getShaderInfoLog(vs));
    throw new Error('shader failure');
  }

  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.error('error compiling FS shaders:', gl.getShaderInfoLog(fs));
    throw new Error('shader failure');
  }

  var program = gl.createProgram();

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  program.uniforms = {
    viewport: gl.getUniformLocation(program, 'viewport')
  };

  program.attributes = {
    position: gl.getAttribLocation(program, 'position'),
    size: gl.getAttribLocation(program, 'size')
  };

  gl.useProgram(program);
  gl.uniform2fv(program.uniforms.viewport, viewportArray);

  return program;
}