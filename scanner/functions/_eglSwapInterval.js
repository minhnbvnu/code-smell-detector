function _eglSwapInterval(display,interval){if(display!=62e3){EGL.setErrorCode(12296);return 0}if(interval==0)_emscripten_set_main_loop_timing(0,0);else _emscripten_set_main_loop_timing(1,interval);EGL.setErrorCode(12288);return 1}