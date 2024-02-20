function EuroFilter(minCutoff, speed) {
    if (minCutoff === undefined) { minCutoff = 1; }
    speed = speed || 0;
    minCutoff = Math.max(1e-4, minCutoff);
    speed = Math.max(0, speed);
    
    const derivativeCutoff = 1;
    this._param = {
        smoothValue:      NaN,
        smoothDerivative: 0,
        derivativeCutoff: derivativeCutoff,

        // f_c from the paper
        minCutoff:        minCutoff,

        // beta from the paper
        speed:            speed
    };
}