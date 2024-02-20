function getExpandedParameters(sig, skipUnionExpanding) {
                if (signatureHasRestParameter(sig)) {
                    const restIndex = sig.parameters.length - 1;
                    const restType = getTypeOfSymbol(sig.parameters[restIndex]);
                    if (isTupleType(restType)) {
                        return [expandSignatureParametersWithTupleMembers(restType, restIndex)];
                    }
                    else if (!skipUnionExpanding && restType.flags & 1048576 /* Union */ && every(restType.types, isTupleType)) {
                        return map(restType.types, (t) => expandSignatureParametersWithTupleMembers(t, restIndex));
                    }
                }
                return [sig.parameters];
                function expandSignatureParametersWithTupleMembers(restType, restIndex) {
                    const elementTypes = getTypeArguments(restType);
                    const associatedNames = restType.target.labeledElementDeclarations;
                    const restParams = map(elementTypes, (t, i) => {
                        const tupleLabelName = !!associatedNames && getTupleElementLabel(associatedNames[i]);
                        const name = tupleLabelName || getParameterNameAtPosition(sig, restIndex + i, restType);
                        const flags = restType.target.elementFlags[i];
                        const checkFlags = flags & 12 /* Variable */ ? 32768 /* RestParameter */ : flags & 2 /* Optional */ ? 16384 /* OptionalParameter */ : 0;
                        const symbol = createSymbol(1 /* FunctionScopedVariable */, name, checkFlags);
                        symbol.links.type = flags & 4 /* Rest */ ? createArrayType(t) : t;
                        return symbol;
                    });
                    return concatenate(sig.parameters.slice(0, restIndex), restParams);
                }
            }