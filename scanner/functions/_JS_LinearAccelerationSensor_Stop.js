function _JS_LinearAccelerationSensor_Stop(){if(JS_LinearAccelerationSensor){if(typeof GravitySensor!=="undefined"||JS_GravitySensor_callback==0){JS_LinearAccelerationSensor.stop();JS_LinearAccelerationSensor.removeEventListener("reading",JS_LinearAccelerationSensor_eventHandler);JS_LinearAccelerationSensor=null}JS_LinearAccelerationSensor_callback=0;JS_LinearAccelerationSensor_frequency=0}else if(JS_LinearAccelerationSensor_callback!=0){JS_LinearAccelerationSensor_callback=0;JS_DeviceMotion_remove()}}