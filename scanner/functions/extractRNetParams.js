function extractRNetParams() {
            var sharedParams = extractSharedParams('rnet');
            var fc1 = extractFCParams('rnet/fc1');
            var prelu4_alpha = extractPReluParams('rnet/prelu4_alpha');
            var fc2_1 = extractFCParams('rnet/fc2_1');
            var fc2_2 = extractFCParams('rnet/fc2_2');
            return __assign$1({}, sharedParams, { fc1: fc1, prelu4_alpha: prelu4_alpha, fc2_1: fc2_1, fc2_2: fc2_2 });
        }