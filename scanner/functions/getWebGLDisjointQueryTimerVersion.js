function getWebGLDisjointQueryTimerVersion(webGLVersion) {
	  if (webGLVersion === 0) {
	    return 0;
	  }

	  var queryTimerVersion;
	  var gl = getWebGLContext(webGLVersion);

	  if (hasExtension(gl, 'EXT_disjoint_timer_query_webgl2') && webGLVersion === 2) {
	    queryTimerVersion = 2;
	  } else if (hasExtension(gl, 'EXT_disjoint_timer_query')) {
	    queryTimerVersion = 1;
	  } else {
	    queryTimerVersion = 0;
	  }

	  return queryTimerVersion;
	}