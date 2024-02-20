function TinyYolov2LossFunction(outputTensor, groundTruth, predictedBoxes, reshapedImgDims, config) {
            this._config = config;
            this._reshapedImgDims = new Dimensions(reshapedImgDims.width, reshapedImgDims.height);
            this._outputTensor = outputTensor;
            this._predictedBoxes = predictedBoxes;
            this.validateGroundTruthBoxes(groundTruth);
            this._groundTruth = this.assignGroundTruthToAnchors(groundTruth);
            var groundTruthMask = this.createGroundTruthMask();
            var _a = this.createCoordAndScoreMasks(), coordBoxOffsetMask = _a.coordBoxOffsetMask, coordBoxSizeMask = _a.coordBoxSizeMask, scoreMask = _a.scoreMask;
            this.noObjectLossMask = tidy(function () { return mul(scoreMask, sub(scalar(1), groundTruthMask)); });
            this.objectLossMask = tidy(function () { return mul(scoreMask, groundTruthMask); });
            this.coordBoxOffsetMask = tidy(function () { return mul(coordBoxOffsetMask, groundTruthMask); });
            this.coordBoxSizeMask = tidy(function () { return mul(coordBoxSizeMask, groundTruthMask); });
            var classScoresMask = tidy(function () { return sub(scalar(1), coordBoxOffsetMask.add(coordBoxSizeMask).add(scoreMask)); });
            this.groundTruthClassScoresMask = tidy(function () { return mul(classScoresMask, groundTruthMask); });
        }