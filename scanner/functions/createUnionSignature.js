function createUnionSignature(signature, unionSignatures) {
                const result = cloneSignature(signature);
                result.compositeSignatures = unionSignatures;
                result.compositeKind = 1048576 /* Union */;
                result.target = void 0;
                result.mapper = void 0;
                return result;
            }