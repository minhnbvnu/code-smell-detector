function cloneSignature(sig) {
                const result = createSignature(sig.declaration, sig.typeParameters, sig.thisParameter, sig.parameters, 
                /*resolvedReturnType*/
                void 0, 
                /*resolvedTypePredicate*/
                void 0, sig.minArgumentCount, sig.flags & 39 /* PropagatingFlags */);
                result.target = sig.target;
                result.mapper = sig.mapper;
                result.compositeSignatures = sig.compositeSignatures;
                result.compositeKind = sig.compositeKind;
                return result;
            }