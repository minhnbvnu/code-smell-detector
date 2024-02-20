function extractPNetParams() {
            var sharedParams = extractSharedParams('pnet');
            var conv4_1 = extractConvParams('pnet/conv4_1');
            var conv4_2 = extractConvParams('pnet/conv4_2');
            return __assign$1({}, sharedParams, { conv4_1: conv4_1, conv4_2: conv4_2 });
        }