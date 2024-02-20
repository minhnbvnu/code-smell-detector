function extractParamsFromWeigthMap$1(weightMap) {
        var paramMappings = [];
        var extractDenseBlock4Params = loadParamsFactory(weightMap, paramMappings).extractDenseBlock4Params;
        var params = {
            dense0: extractDenseBlock4Params('dense0', true),
            dense1: extractDenseBlock4Params('dense1'),
            dense2: extractDenseBlock4Params('dense2'),
            dense3: extractDenseBlock4Params('dense3')
        };
        disposeUnusedWeightTensors(weightMap, paramMappings);
        return { params: params, paramMappings: paramMappings };
    }