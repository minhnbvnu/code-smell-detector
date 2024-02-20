function brandWithChannel(sourceLists, funcs, needs, funcIndex, samplerNum) {
    samplerNum === undefined || samplerNum === -1
        ? (needs.neighborSample = true)
        : (needs.extraBuffers = new Set([samplerNum]));
    if (samplerNum === undefined || samplerNum === -1)
        return;
    const { origFuncName, newFuncName, ending } = nameExtractor(sourceLists, samplerNum !== undefined ? "_" + samplerNum : "");
    sourceLists.sections[0] = sourceLists.sections[0]
        .split(origFuncName)
        .join(newFuncName);
    funcs[funcIndex] = funcs[funcIndex]
        .split(origFuncName)
        .join(newFuncName)
        .split("uSampler")
        .join("uBufferSampler" + samplerNum);
}