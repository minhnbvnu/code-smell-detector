function createLow(){
        var filter = context.createBiquadFilter();
        filter.type = "lowshelf";
        filter.frequency.value = 320.0;
        filter.gain.value = lowValue;
        return filter;
    }