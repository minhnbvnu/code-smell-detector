function getWebGLRenderingContext(webGLVersion) {
	  if (webGLVersion !== 1 && webGLVersion !== 2) {
	    throw new Error('Cannot get WebGL rendering context, WebGL is disabled.');
	  }

	  var canvas = createCanvas(webGLVersion);
	  canvas.addEventListener('webglcontextlost', function (ev) {
	    ev.preventDefault();
	    delete contexts[webGLVersion];
	  }, false);

	  if (webGLVersion === 1) {
	    return canvas.getContext('webgl', WEBGL_ATTRIBUTES) || canvas.getContext('experimental-webgl', WEBGL_ATTRIBUTES);
	  }

	  return canvas.getContext('webgl2', WEBGL_ATTRIBUTES);
	}