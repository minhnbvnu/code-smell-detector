function addImmediateMode() {
  var immediateMode = {
    mesh: new Mesh({ coords: true, colors: true, triangles: false }),
    mode: -1,
    coord: [0, 0, 0, 0],
    color: [1, 1, 1, 1],
    pointSize: 1,
    shader: new Shader('\
      uniform float pointSize;\
      varying vec4 color;\
      varying vec4 coord;\
      void main() {\
        color = gl_Color;\
        coord = gl_TexCoord;\
        gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
        gl_PointSize = pointSize;\
      }\
    ', '\
      uniform sampler2D texture;\
      uniform float pointSize;\
      uniform bool useTexture;\
      varying vec4 color;\
      varying vec4 coord;\
      void main() {\
        gl_FragColor = color;\
        if (useTexture) gl_FragColor *= texture2D(texture, coord.xy);\
      }\
    ')
  };
  gl.pointSize = function(pointSize) {
    immediateMode.shader.uniforms({ pointSize: pointSize });
  };
  gl.begin = function(mode) {
    if (immediateMode.mode != -1) throw new Error('mismatched gl.begin() and gl.end() calls');
    immediateMode.mode = mode;
    immediateMode.mesh.colors = [];
    immediateMode.mesh.coords = [];
    immediateMode.mesh.vertices = [];
  };
  gl.color = function(r, g, b, a) {
    immediateMode.color = (arguments.length == 1) ? r.toArray().concat(1) : [r, g, b, a || 1];
  };
  gl.texCoord = function(s, t) {
    immediateMode.coord = (arguments.length == 1) ? s.toArray(2) : [s, t];
  };
  gl.vertex = function(x, y, z) {
    immediateMode.mesh.colors.push(immediateMode.color);
    immediateMode.mesh.coords.push(immediateMode.coord);
    immediateMode.mesh.vertices.push(arguments.length == 1 ? x.toArray() : [x, y, z]);
  };
  gl.end = function() {
    if (immediateMode.mode == -1) throw new Error('mismatched gl.begin() and gl.end() calls');
    immediateMode.mesh.compile();
    immediateMode.shader.uniforms({
      useTexture: !!gl.getParameter(gl.TEXTURE_BINDING_2D)
    }).draw(immediateMode.mesh, immediateMode.mode);
    immediateMode.mode = -1;
  };
}