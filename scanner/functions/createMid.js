function createMid(){
        var filter = context.createBiquadFilter();
        filter.type = "peaking";
        filter.frequency.value = 1000.0;
        filter.Q.value = 0.5;
        filter.gain.value = midValue;
        return filter;
    }