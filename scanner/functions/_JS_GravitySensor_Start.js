function _JS_GravitySensor_Start(callback,frequency){if(typeof GravitySensor==="undefined"){_JS_Accelerometer_Start(0,Math.max(frequency,JS_Accelerometer_frequency));_JS_LinearAccelerationSensor_Start(0,Math.max(frequency,JS_LinearAccelerationSensor_frequency));JS_GravitySensor_callback=callback;return}JS_DefineAccelerometerMultiplier();JS_GravitySensor_callback=callback;function InitializeGravitySensor(frequency){JS_GravitySensor=new GravitySensor({frequency:frequency,referenceFrame:"device"});JS_GravitySensor.addEventListener("reading",JS_GravitySensor_eventHandler);JS_GravitySensor.addEventListener("error",function(e){warnOnce(e.error?e.error:e)});JS_GravitySensor.start()}if(JS_GravitySensor){JS_GravitySensor.stop();JS_GravitySensor.removeEventListener("reading",JS_GravitySensor_eventHandler);InitializeGravitySensor(frequency)}else if(JS_GravitySensor_frequencyRequest!=0){JS_GravitySensor_frequencyRequest=frequency}else{JS_GravitySensor_frequencyRequest=frequency;navigator.permissions.query({name:"accelerometer"}).then(function(result){if(result.state==="granted"){InitializeGravitySensor(JS_GravitySensor_frequencyRequest)}else{warnOnce("No permission to use GravitySensor.")}JS_GravitySensor_frequencyRequest=0})}}