function connectFilters(){

    output = input;

        if (useHigh){
            highGain = highGain || createHigh();
            output.connect(highGain);
            output = highGain;
        }

        if (useMid){
            midGain = midGain || createMid();
            output.connect(midGain);
            output = midGain;
        }

        if (useLow){
            lowGain = lowGain || createLow();
            output.connect(lowGain);
            output = lowGain;
        }

        if (useLowPass){
            lowPassfilter = lowPassfilter || createLowPass();
            output.connect(lowPassfilter);
            output = lowPassfilter;
        }


        if (useDistortion){
            distortion = distortion || context.createWaveShaper();
            distortionGain = distortionGain || context.createGain();
            distortion.curve = distortionCurve(distortionGain);
            distortion.oversample = '4x';

        output.connect(distortionGain);
        distortionGain.connect(distortion)
        output = distortion
        }

    if (useCompression){
        compressor = compressor || context.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-25, context.currentTime);
        compressor.attack.setValueAtTime(0, context.currentTime);
        compressor.release.setValueAtTime(12, context.currentTime);
        output.connect(compressor);
        output = compressor;
    }

    if (useDelay){
        delay = delay || createPingPongDelay(.12, .4);
        delayGain = delayGain || context.createGain();
        delayGain.gain.value = 0;

        output.connect(delayGain);
        delayGain.connect(delay.splitter);
        output_delay = delay.merger;
    }

    if (useReverb){
        reverb = reverb || context.createConvolver();
        reverbGain = reverbGain || context.createGain();
        reverbGain.gain.value = 0;

        output.connect(reverbGain);
        reverbGain.connect(reverb);
        output_reverb = reverb;
    }

        if (usePanning){
            panner =  panner || Audio.context.createStereoPanner();
            output.connect(panner);
            output = panner;
        }

        // always use volume as last node - never disconnect this

    volumeGain = volumeGain ||context.createGain();
        output.connect(volumeGain);
        if (output_reverb) output_reverb.connect(volumeGain);
    if (output_delay) output_delay.connect(volumeGain);
        output = volumeGain;

    }