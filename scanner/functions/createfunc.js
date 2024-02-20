function createfunc(bin) {
    return function(d, i) {return yRange(Math.sin(d * bin) * signalAmp); };
}