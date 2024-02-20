function godrays(options = {}) {
    return new GodRaysExpr(options.color, expr_1.wrapInValue(options.exposure), expr_1.wrapInValue(options.decay), expr_1.wrapInValue(options.density), expr_1.wrapInValue(options.weight), options.lightPos, options.samplerNum, options.numSamples, options.convertDepth === undefined
        ? undefined
        : {
            threshold: expr_1.wrapInValue(options.convertDepth.threshold),
            newColor: options.convertDepth.newColor,
        });
}