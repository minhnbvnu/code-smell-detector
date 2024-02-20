function getParameterIdentifierNameAtPosition(signature, pos) {
                var _a2;
                if (((_a2 = signature.declaration) == null ? void 0 : _a2.kind) === 320 /* JSDocFunctionType */) {
                    return void 0;
                }
                const paramCount = signature.parameters.length - (signatureHasRestParameter(signature) ? 1 : 0);
                if (pos < paramCount) {
                    const param = signature.parameters[pos];
                    return isParameterDeclarationWithIdentifierName(param) ? [param.escapedName, false] : void 0;
                }
                const restParameter = signature.parameters[paramCount] || unknownSymbol;
                if (!isParameterDeclarationWithIdentifierName(restParameter)) {
                    return void 0;
                }
                const restType = getTypeOfSymbol(restParameter);
                if (isTupleType(restType)) {
                    const associatedNames = restType.target.labeledElementDeclarations;
                    const index = pos - paramCount;
                    const associatedName = associatedNames == null ? void 0 : associatedNames[index];
                    const isRestTupleElement = !!(associatedName == null ? void 0 : associatedName.dotDotDotToken);
                    return associatedName ? [
                        getTupleElementLabel(associatedName),
                        isRestTupleElement
                    ] : void 0;
                }
                if (pos === paramCount) {
                    return [restParameter.escapedName, true];
                }
                return void 0;
            }