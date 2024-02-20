function channelSamplerName(num) {
    // texture 2 sampler has number 0 (0 and 1 are used for back buffer and scene)
    return num === -1 ? "uSampler" : `uBufferSampler${num}`;
}