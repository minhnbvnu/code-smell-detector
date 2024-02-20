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