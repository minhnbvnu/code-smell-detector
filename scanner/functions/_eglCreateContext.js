function _eglCreateContext(display,config,hmm,contextAttribs){if(display!=62e3){EGL.setErrorCode(12296);return 0}var glesContextVersion=1;for(;;){var param=HEAP32[contextAttribs>>2];if(param==12440){glesContextVersion=HEAP32[contextAttribs+4>>2]}else if(param==12344){break}else{EGL.setErrorCode(12292);return 0}contextAttribs+=8}if(glesContextVersion!=2){EGL.setErrorCode(12293);return 0}EGL.contextAttributes.majorVersion=glesContextVersion-1;EGL.contextAttributes.minorVersion=0;EGL.context=GL.createContext(Module["canvas"],EGL.contextAttributes);if(EGL.context!=0){EGL.setErrorCode(12288);GL.makeContextCurrent(EGL.context);Module.useWebGL=true;Browser.moduleContextCreatedCallbacks.forEach(function(callback){callback()});GL.makeContextCurrent(null);return 62004}else{EGL.setErrorCode(12297);return 0}}