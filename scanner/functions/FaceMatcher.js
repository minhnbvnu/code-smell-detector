function FaceMatcher(inputs, distanceThreshold) {
            if (distanceThreshold === void 0) { distanceThreshold = 0.6; }
            this._distanceThreshold = distanceThreshold;
            var inputArray = Array.isArray(inputs) ? inputs : [inputs];
            if (!inputArray.length) {
                throw new Error("FaceRecognizer.constructor - expected atleast one input");
            }
            var count = 1;
            var createUniqueLabel = function () { return "person " + count++; };
            this._labeledDescriptors = inputArray.map(function (desc) {
                if (desc instanceof LabeledFaceDescriptors) {
                    return desc;
                }
                if (desc instanceof Float32Array) {
                    return new LabeledFaceDescriptors(createUniqueLabel(), [desc]);
                }
                if (desc.descriptor && desc.descriptor instanceof Float32Array) {
                    return new LabeledFaceDescriptors(createUniqueLabel(), [desc.descriptor]);
                }
                throw new Error("FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>");
            });
        }