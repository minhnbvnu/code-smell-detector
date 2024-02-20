function extractParams$7(weights) {
        var _a = extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
        var paramMappings = [];
        var _b = extractorsFactory$8(extractWeights, paramMappings), extractPNetParams = _b.extractPNetParams, extractRNetParams = _b.extractRNetParams, extractONetParams = _b.extractONetParams;
        var pnet = extractPNetParams();
        var rnet = extractRNetParams();
        var onet = extractONetParams();
        if (getRemainingWeights().length !== 0) {
            throw new Error("weights remaing after extract: " + getRemainingWeights().length);
        }
        return { params: { pnet: pnet, rnet: rnet, onet: onet }, paramMappings: paramMappings };
    }