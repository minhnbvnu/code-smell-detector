function addOtherMethods() {
  // ### Multiple contexts
  //
  // When using multiple contexts in one web page, `gl.makeCurrent()` must be
  // called before issuing commands to a different context.
  (function(context) {
    gl.makeCurrent = function() {
      gl = context;
    };
  })(gl);

  // ### Animation
  //
  // Call `gl.animate()` to provide an animation loop that repeatedly calls
  // `gl.onupdate()` and `gl.ondraw()`.
  gl.animate = function() {
    var post =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function(callback) { setTimeout(callback, 1000 / 60); };
    var time = new Date().getTime();
    var context = gl;
    function update() {
      gl = context;
      var now = new Date().getTime();
      if (gl.onupdate) gl.onupdate((now - time) / 1000);
      if (gl.ondraw) gl.ondraw();
      post(update);
      time = now;
    }
    update();
  };

  // ### Fullscreen
  //
  // Provide an easy way to get a fullscreen app running, including an
  // automatic 3D perspective projection matrix by default. This should be
  // called once.
  //
  // Just fullscreen, no automatic camera:
  //
  //     gl.fullscreen({ camera: false });
  //
  // Adjusting field of view, near plane distance, and far plane distance:
  //
  //     gl.fullscreen({ fov: 45, near: 0.1, far: 1000 });
  //
  // Adding padding from the edge of the window:
  //
  //     gl.fullscreen({ paddingLeft: 250, paddingBottom: 60 });
  //
  gl.fullscreen = function(options) {
    options = options || {};
    var top = options.paddingTop || 0;
    var left = options.paddingLeft || 0;
    var right = options.paddingRight || 0;
    var bottom = options.paddingBottom || 0;
    if (!document.body) {
      throw new Error('document.body doesn\'t exist yet (call gl.fullscreen() from ' +
        'window.onload() or from inside the <body> tag)');
    }
    document.body.appendChild(gl.canvas);
    document.body.style.overflow = 'hidden';
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.left = left + 'px';
    gl.canvas.style.top = top + 'px';
    function resize() {
      gl.canvas.width = window.innerWidth - left - right;
      gl.canvas.height = window.innerHeight - top - bottom;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      if (options.camera || !('camera' in options)) {
        gl.matrixMode(gl.PROJECTION);
        gl.loadIdentity();
        gl.perspective(options.fov || 45, gl.canvas.width / gl.canvas.height,
          options.near || 0.1, options.far || 1000);
        gl.matrixMode(gl.MODELVIEW);
      }
      if (gl.ondraw) gl.ondraw();
    }
    on(window, 'resize', resize);
    resize();
  };
}