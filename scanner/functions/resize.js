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