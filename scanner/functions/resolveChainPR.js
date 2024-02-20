function resolveChainPR(chainPR, pipeline) {
    const defaultChainPR = typeof chainPR === 'undefined' ? false : chainPR;
    const annotChainPR = pipeline.annotations[ANNOT_CHAIN_PR];

    return typeof annotChainPR === 'undefined' ? defaultChainPR : annotChainPR;
}