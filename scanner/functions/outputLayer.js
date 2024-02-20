function outputLayer(boxPredictions, classPredictions, params) {
        return tidy(function () {
            var batchSize = boxPredictions.shape[0];
            var boxes = decodeBoxesLayer(reshape(tile(params.extra_dim, [batchSize, 1, 1]), [-1, 4]), reshape(boxPredictions, [-1, 4]));
            boxes = reshape(boxes, [batchSize, (boxes.shape[0] / batchSize), 4]);
            var scoresAndClasses = sigmoid(slice(classPredictions, [0, 0, 1], [-1, -1, -1]));
            var scores = slice(scoresAndClasses, [0, 0, 0], [-1, -1, 1]);
            scores = reshape(scores, [batchSize, scores.shape[1]]);
            var boxesByBatch = unstack(boxes);
            var scoresByBatch = unstack(scores);
            return {
                boxes: boxesByBatch,
                scores: scoresByBatch
            };
        });
    }