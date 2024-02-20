function mixSampleBuffers(sampleBuffer1, sampleBuffer2, negate, volumeCorrection){
    var outputSamples = new Array(sampleBuffer1);

    for(var i = 0; i<sampleBuffer1.length; i++){
        outputSamples[i] += (negate ? -sampleBuffer2[i] : sampleBuffer2[i]) / volumeCorrection;
    }
    
    return outputSamples;
}