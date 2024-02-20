function processOutputs(span, pixelGroups, circuitDefinition) {
    let [ketPixels, qualityPixels, rawIncoherentKetPixels] = pixelGroups;
    let denormalizedQuality = qualityPixels[0];
    let n = 1 << span;
    let w = n === 2 ? 2 : 1 << Math.floor(Math.round(Math.log2(n))/2);
    let h = n/w;

    // Rescale quantities.
    let unity = 0;
    for (let e of ketPixels) {
        unity += e*e;
    }
    let incoherentKetPixels = new Float32Array(w * h * 2);
    let incoherentUnity = 0;
    for (let i = 0; i < n; i++) {
        incoherentUnity += rawIncoherentKetPixels[i];
    }
    for (let i = 0; i < n; i++) {
        incoherentKetPixels[i << 1] = Math.sqrt(rawIncoherentKetPixels[i] / incoherentUnity);
    }
    if (isNaN(incoherentUnity) || incoherentUnity < 0.000001) {
        return {
            quality: 0.0,
            ket: Matrix.zero(w, h).times(NaN),
            phaseLockIndex: 0,
            incoherentKet: Matrix.zero(w, h).times(NaN),
        };
    }
    let quality = denormalizedQuality / unity / incoherentUnity;

    let phaseIndex = span === circuitDefinition.numWires ? undefined : _processOutputs_pickPhaseLockIndex(ketPixels);
    let phase = phaseIndex === undefined ? 0 : Math.atan2(ketPixels[phaseIndex*2+1], ketPixels[phaseIndex*2]);
    let c = Math.cos(phase);
    let s = -Math.sin(phase);

    let buf = new Float32Array(n*2);
    let sqrtUnity = Math.sqrt(unity);
    for (let i = 0; i < n; i++) {
        let real = ketPixels[i*2]/sqrtUnity;
        let imag = ketPixels[i*2+1]/sqrtUnity;
        buf[i*2] = real*c + imag*-s;
        buf[i*2+1] = real*s + imag*c;
    }
    return {
        quality,
        ket: new Matrix(w, h, buf),
        phaseLockIndex: phaseIndex,
        incoherentKet: new Matrix(w, h, incoherentKetPixels),
    };
}