function stage1(imgTensor, scales, scoreThreshold, params, stats) {
        stats.stage1 = [];
        var pnetOutputs = scales.map(function (scale) { return tidy(function () {
            var statsForScale = { scale: scale };
            var resized = rescaleAndNormalize(imgTensor, scale);
            var ts = Date.now();
            var _a = PNet(resized, params), prob = _a.prob, regions = _a.regions;
            statsForScale.pnet = Date.now() - ts;
            var scoresTensor = unstack(unstack(prob, 3)[1])[0];
            var regionsTensor = unstack(regions)[0];
            return {
                scoresTensor: scoresTensor,
                regionsTensor: regionsTensor,
                scale: scale,
                statsForScale: statsForScale
            };
        }); });
        var boxesForScale = pnetOutputs.map(function (_a) {
            var scoresTensor = _a.scoresTensor, regionsTensor = _a.regionsTensor, scale = _a.scale, statsForScale = _a.statsForScale;
            var boundingBoxes = extractBoundingBoxes(scoresTensor, regionsTensor, scale, scoreThreshold);
            scoresTensor.dispose();
            regionsTensor.dispose();
            if (!boundingBoxes.length) {
                stats.stage1.push(statsForScale);
                return [];
            }
            var ts = Date.now();
            var indices = nonMaxSuppression$1(boundingBoxes.map(function (bbox) { return bbox.cell; }), boundingBoxes.map(function (bbox) { return bbox.score; }), 0.5);
            statsForScale.nms = Date.now() - ts;
            statsForScale.numBoxes = indices.length;
            stats.stage1.push(statsForScale);
            return indices.map(function (boxIdx) { return boundingBoxes[boxIdx]; });
        });
        var allBoxes = boxesForScale.reduce(function (all$$1, boxes) { return all$$1.concat(boxes); }, []);
        var finalBoxes = [];
        var finalScores = [];
        if (allBoxes.length > 0) {
            var ts = Date.now();
            var indices = nonMaxSuppression$1(allBoxes.map(function (bbox) { return bbox.cell; }), allBoxes.map(function (bbox) { return bbox.score; }), 0.7);
            stats.stage1_nms = Date.now() - ts;
            finalScores = indices.map(function (idx) { return allBoxes[idx].score; });
            finalBoxes = indices
                .map(function (idx) { return allBoxes[idx]; })
                .map(function (_a) {
                var cell = _a.cell, region = _a.region;
                return new BoundingBox(cell.left + (region.left * cell.width), cell.top + (region.top * cell.height), cell.right + (region.right * cell.width), cell.bottom + (region.bottom * cell.height)).toSquare().round();
            });
        }
        return {
            boxes: finalBoxes,
            scores: finalScores
        };
    }