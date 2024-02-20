function Sound(numSamples, numChans, sampleRate)
    {
        if (numSamples === undefined)
            numSamples = 0;

        if (numChans === undefined)
            numChans = 1;

        if (sampleRate === undefined)
            sampleRate = 44100;

        this.numSamples = numSamples;
        this.numChans = numChans;
        this.sampleRate = sampleRate;

        this.samples = new Array(numSamples * numChans);
    }