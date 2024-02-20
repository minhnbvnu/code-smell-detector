function extractBatchNormParams(prefix) {
            var sub = extractWeightEntry(prefix + "/sub", 1);
            var truediv = extractWeightEntry(prefix + "/truediv", 1);
            return { sub: sub, truediv: truediv };
        }