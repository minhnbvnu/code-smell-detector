function extractParamsFromWeigthMap$6(weightMap) {
        var paramMappings = [];
        var _a = extractorsFactory$7(weightMap, paramMappings), extractMobilenetV1Params = _a.extractMobilenetV1Params, extractPredictionLayerParams = _a.extractPredictionLayerParams;
        var extra_dim = weightMap['Output/extra_dim'];
        paramMappings.push({ originalPath: 'Output/extra_dim', paramPath: 'output_layer/extra_dim' });
        if (!isTensor3D(extra_dim)) {
            throw new Error("expected weightMap['Output/extra_dim'] to be a Tensor3D, instead have " + extra_dim);
        }
        var params = {
            mobilenetv1: extractMobilenetV1Params(),
            prediction_layer: extractPredictionLayerParams(),
            output_layer: {
                extra_dim: extra_dim
            }
        };
        disposeUnusedWeightTensors(weightMap, paramMappings);
        return { params: params, paramMappings: paramMappings };
    }