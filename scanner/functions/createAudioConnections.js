function createAudioConnections(audioContext,destination){

        cutOffVolume = audioContext.createGain();
        cutOffVolume.gain.setValueAtTime(1,0);

        // Haas effect stereo expander
        var useStereoExpander = false;
        if (useStereoExpander){
            var splitter = audioContext.createChannelSplitter(2);
            var merger = audioContext.createChannelMerger(2);
            var haasDelay = audioContext.createDelay(1);
            cutOffVolume.connect(splitter);
            splitter.connect(haasDelay, 0);
            haasDelay.connect(merger, 0, 0);
            splitter.connect(merger, 1, 1);
            merger.connect(destination || audioContext.destination);
            window.haasDelay = haasDelay;
        }else{
            cutOffVolume.connect(destination || audioContext.destination);
        }







        masterVolume = audioContext.createGain();
        masterVolume.connect(cutOffVolume);
        me.setMasterVolume(1);

        lowPassfilter = audioContext.createBiquadFilter();
        lowPassfilter.type = "lowpass";
        lowPassfilter.frequency.setValueAtTime(20000,0);

        lowPassfilter.connect(masterVolume);

        me.masterVolume = masterVolume;
        me.cutOffVolume = cutOffVolume;
        me.lowPassfilter = lowPassfilter;
    }