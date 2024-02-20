function createSignature(declaration, typeParameters, thisParameter, parameters, resolvedReturnType, resolvedTypePredicate, minArgumentCount, flags) {
                const sig = new Signature15(checker, flags);
                sig.declaration = declaration;
                sig.typeParameters = typeParameters;
                sig.parameters = parameters;
                sig.thisParameter = thisParameter;
                sig.resolvedReturnType = resolvedReturnType;
                sig.resolvedTypePredicate = resolvedTypePredicate;
                sig.minArgumentCount = minArgumentCount;
                sig.resolvedMinArgumentCount = void 0;
                sig.target = void 0;
                sig.mapper = void 0;
                sig.compositeSignatures = void 0;
                sig.compositeKind = void 0;
                return sig;
            }