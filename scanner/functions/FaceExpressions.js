function FaceExpressions(probabilities) {
            var _this = this;
            if (probabilities.length !== 7) {
                throw new Error("FaceExpressions.constructor - expected probabilities.length to be 7, have: " + probabilities.length);
            }
            FACE_EXPRESSION_LABELS.forEach(function (expression, idx) {
                _this[expression] = probabilities[idx];
            });
        }