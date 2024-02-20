function extractBoundingBoxes(scoresTensor, regionsTensor, scale, scoreThreshold) {
        // TODO: fix this!, maybe better to use tf.gather here
        var indices = [];
        for (var y = 0; y < scoresTensor.shape[0]; y++) {
            for (var x = 0; x < scoresTensor.shape[1]; x++) {
                if (scoresTensor.get(y, x) >= scoreThreshold) {
                    indices.push(new Point(x, y));
                }
            }
        }
        var boundingBoxes = indices.map(function (idx) {
            var cell = new BoundingBox(Math.round((idx.y * CELL_STRIDE + 1) / scale), Math.round((idx.x * CELL_STRIDE + 1) / scale), Math.round((idx.y * CELL_STRIDE + CELL_SIZE$1) / scale), Math.round((idx.x * CELL_STRIDE + CELL_SIZE$1) / scale));
            var score = scoresTensor.get(idx.y, idx.x);
            var region = new MtcnnBox(regionsTensor.get(idx.y, idx.x, 0), regionsTensor.get(idx.y, idx.x, 1), regionsTensor.get(idx.y, idx.x, 2), regionsTensor.get(idx.y, idx.x, 3));
            return {
                cell: cell,
                score: score,
                region: region
            };
        });
        return boundingBoxes;
    }