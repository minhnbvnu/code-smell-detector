function _emscripten_exit_fullscreen(){if(!JSEvents.fullscreenEnabled())return-1;JSEvents.removeDeferredCalls(_JSEvents_requestFullscreen);var d=specialHTMLTargets[1];if(d.exitFullscreen){d.fullscreenElement&&d.exitFullscreen()}else if(d.webkitExitFullscreen){d.webkitFullscreenElement&&d.webkitExitFullscreen()}else{return-1}return 0}