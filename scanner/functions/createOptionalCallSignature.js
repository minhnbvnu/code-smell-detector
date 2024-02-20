function createOptionalCallSignature(signature, callChainFlags) {
                Debug.assert(callChainFlags === 8 /* IsInnerCallChain */ || callChainFlags === 16 /* IsOuterCallChain */, "An optional call signature can either be for an inner call chain or an outer call chain, but not both.");
                const result = cloneSignature(signature);
                result.flags |= callChainFlags;
                return result;
            }