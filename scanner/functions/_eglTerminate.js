function _eglTerminate(display){if(display!=62e3){EGL.setErrorCode(12296);return 0}EGL.currentContext=0;EGL.currentReadSurface=0;EGL.currentDrawSurface=0;EGL.defaultDisplayInitialized=false;EGL.setErrorCode(12288);return 1}