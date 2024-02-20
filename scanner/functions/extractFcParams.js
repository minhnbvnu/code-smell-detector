function extractFcParams(prefix) {
            var weights = extractWeightEntry(prefix + "/weights", 2);
            var bias = extractWeightEntry(prefix + "/bias", 1);
            return { weights: weights, bias: bias };
        }