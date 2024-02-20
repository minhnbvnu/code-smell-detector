function extractParamsFromWeigthMap$5(weightMap) {
        var paramMappings = [];
        var _a = extractorsFactory$8(weightMap, paramMappings), extractPNetParams = _a.extractPNetParams, extractRNetParams = _a.extractRNetParams, extractONetParams = _a.extractONetParams;
        var pnet = extractPNetParams();
        var rnet = extractRNetParams();
        var onet = extractONetParams();
        disposeUnusedWeightTensors(weightMap, paramMappings);
        return { params: { pnet: pnet, rnet: rnet, onet: onet }, paramMappings: paramMappings };
    }