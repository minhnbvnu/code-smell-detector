function InitializeOrientationSensor(frequency){JS_OrientationSensor=new RelativeOrientationSensor({frequency:frequency,referenceFrame:"device"});JS_OrientationSensor.addEventListener("reading",JS_OrientationSensor_eventHandler);JS_OrientationSensor.addEventListener("error",function(e){warnOnce(e.error?e.error:e)});JS_OrientationSensor.start()}