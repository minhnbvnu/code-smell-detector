function instantiateSignature(signature, mapper, eraseTypeParameters) {
                let freshTypeParameters;
                if (signature.typeParameters && !eraseTypeParameters) {
                    freshTypeParameters = map(signature.typeParameters, cloneTypeParameter);
                    mapper = combineTypeMappers(createTypeMapper(signature.typeParameters, freshTypeParameters), mapper);
                    for (const tp of freshTypeParameters) {
                        tp.mapper = mapper;
                    }
                }
                const result = createSignature(signature.declaration, freshTypeParameters, signature.thisParameter && instantiateSymbol(signature.thisParameter, mapper), instantiateList(signature.parameters, mapper, instantiateSymbol), 
                /*resolvedReturnType*/
                void 0, 
                /*resolvedTypePredicate*/
                void 0, signature.minArgumentCount, signature.flags & 39 /* PropagatingFlags */);
                result.target = signature;
                result.mapper = mapper;
                return result;
            }