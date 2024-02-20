function createHigh(){
    var filter = context.createBiquadFilter();
    filter.type = "highshelf";
    filter.frequency.value = 3200.0;
    filter.gain.value = highValue;
    return filter;
    }