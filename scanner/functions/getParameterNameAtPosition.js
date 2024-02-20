function getParameterNameAtPosition(signature, pos, overrideRestType) {
                const paramCount = signature.parameters.length - (signatureHasRestParameter(signature) ? 1 : 0);
                if (pos < paramCount) {
                    return signature.parameters[pos].escapedName;
                }
                const restParameter = signature.parameters[paramCount] || unknownSymbol;
                const restType = overrideRestType || getTypeOfSymbol(restParameter);
                if (isTupleType(restType)) {
                    const associatedNames = restType.target.labeledElementDeclarations;
                    const index = pos - paramCount;
                    return associatedNames && getTupleElementLabel(associatedNames[index]) || restParameter.escapedName + "_" + index;
                }
                return restParameter.escapedName;
            }