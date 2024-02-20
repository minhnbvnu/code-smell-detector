function boxPredictionLayer(x, params) {
        return tidy(function () {
            var batchSize = x.shape[0];
            var boxPredictionEncoding = reshape(convLayer(x, params.box_encoding_predictor), [batchSize, -1, 1, 4]);
            var classPrediction = reshape(convLayer(x, params.class_predictor), [batchSize, -1, 3]);
            return {
                boxPredictionEncoding: boxPredictionEncoding,
                classPrediction: classPrediction
            };
        });
    }