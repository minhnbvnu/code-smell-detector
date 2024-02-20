function NetInput(inputs, treatAsBatchInput) {
            if (treatAsBatchInput === void 0) { treatAsBatchInput = false; }
            var _this = this;
            this._imageTensors = [];
            this._canvases = [];
            this._treatAsBatchInput = false;
            this._inputDimensions = [];
            if (!Array.isArray(inputs)) {
                throw new Error("NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have " + inputs);
            }
            this._treatAsBatchInput = treatAsBatchInput;
            this._batchSize = inputs.length;
            inputs.forEach(function (input, idx) {
                if (isTensor3D(input)) {
                    _this._imageTensors[idx] = input;
                    _this._inputDimensions[idx] = input.shape;
                    return;
                }
                if (isTensor4D(input)) {
                    var batchSize = input.shape[0];
                    if (batchSize !== 1) {
                        throw new Error("NetInput - tf.Tensor4D with batchSize " + batchSize + " passed, but not supported in input array");
                    }
                    _this._imageTensors[idx] = input;
                    _this._inputDimensions[idx] = input.shape.slice(1);
                    return;
                }
                var canvas = input instanceof env.getEnv().Canvas ? input : createCanvasFromMedia(input);
                _this._canvases[idx] = canvas;
                _this._inputDimensions[idx] = [canvas.height, canvas.width, 3];
            });
        }