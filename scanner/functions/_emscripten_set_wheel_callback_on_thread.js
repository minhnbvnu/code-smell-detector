function _emscripten_set_wheel_callback_on_thread(target,userData,useCapture,callbackfunc,targetThread){target=findEventTarget(target);if(typeof target.onwheel!="undefined"){registerWheelEventCallback(target,userData,useCapture,callbackfunc,9,"wheel",targetThread);return 0}else{return-1}}