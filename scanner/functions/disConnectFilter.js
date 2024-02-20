function disConnectFilter(){
        input.disconnect();
        if (highGain) highGain.disconnect();
        if (midGain) midGain.disconnect();
        if (lowGain) lowGain.disconnect();
        if (lowPassfilter) lowPassfilter.disconnect();
        if (reverbGain) reverbGain.disconnect();
    if (panner) panner.disconnect();
    if (distortion) distortion.disconnect();
    if (delayGain) delayGain.disconnect();
    if (compressor) compressor.disconnect();
        output_reverb = undefined;
    output_delay = undefined;
    }