function shader(type, source) {
    var s = gl.createShader(type);

    gl.shaderSource(s, source);
    gl.compileShader(s);

    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      var log = gl.getShaderInfoLog(s);
      console.log(log);
      console.log(source);
      die('Glod.createProgram: compilation failed', log);
    }

    gl.attachShader(program, s);
  }