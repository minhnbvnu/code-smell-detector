function getGLContext(canvas) {
  var names = [
    'webgl',
    'experimental-webgl',
    'webkit-3d',
    'moz-webgl'
  ];

  var i = 0, gl;
  while (!gl && i++ < names.length) {
    try {
      gl = canvas.getContext(names[i]);
    } catch(e) {}
  }
  return gl;
}