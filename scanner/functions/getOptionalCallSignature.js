function getOptionalCallSignature(signature, callChainFlags) {
                if ((signature.flags & 24 /* CallChainFlags */) === callChainFlags) {
                    return signature;
                }
                if (!signature.optionalCallSignatureCache) {
                    signature.optionalCallSignatureCache = {};
                }
                const key = callChainFlags === 8 /* IsInnerCallChain */ ? "inner" : "outer";
                return signature.optionalCallSignatureCache[key] || (signature.optionalCallSignatureCache[key] = createOptionalCallSignature(signature, callChainFlags));
            }