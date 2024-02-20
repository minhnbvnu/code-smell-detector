function createUnionOfSignaturesForOverloadFailure(candidates) {
                const thisParameters = mapDefined(candidates, (c) => c.thisParameter);
                let thisParameter;
                if (thisParameters.length) {
                    thisParameter = createCombinedSymbolFromTypes(thisParameters, thisParameters.map(getTypeOfParameter));
                }
                const { min: minArgumentCount, max: maxNonRestParam } = minAndMax(candidates, getNumNonRestParameters);
                const parameters = [];
                for (let i = 0; i < maxNonRestParam; i++) {
                    const symbols = mapDefined(candidates, (s) => signatureHasRestParameter(s) ? i < s.parameters.length - 1 ? s.parameters[i] : last(s.parameters) : i < s.parameters.length ? s.parameters[i] : void 0);
                    Debug.assert(symbols.length !== 0);
                    parameters.push(createCombinedSymbolFromTypes(symbols, mapDefined(candidates, (candidate) => tryGetTypeAtPosition(candidate, i))));
                }
                const restParameterSymbols = mapDefined(candidates, (c) => signatureHasRestParameter(c) ? last(c.parameters) : void 0);
                let flags = 0 /* None */;
                if (restParameterSymbols.length !== 0) {
                    const type = createArrayType(getUnionType(mapDefined(candidates, tryGetRestTypeOfSignature), 2 /* Subtype */));
                    parameters.push(createCombinedSymbolForOverloadFailure(restParameterSymbols, type));
                    flags |= 1 /* HasRestParameter */;
                }
                if (candidates.some(signatureHasLiteralTypes)) {
                    flags |= 2 /* HasLiteralTypes */;
                }
                return createSignature(candidates[0].declaration, 
                /*typeParameters*/
                void 0, 
                // Before calling this we tested for `!candidates.some(c => !!c.typeParameters)`.
                thisParameter, parameters, 
                /*resolvedReturnType*/
                getIntersectionType(candidates.map(getReturnTypeOfSignature)), 
                /*typePredicate*/
                void 0, minArgumentCount, flags);
            }