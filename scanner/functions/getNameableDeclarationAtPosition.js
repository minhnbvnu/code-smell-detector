function getNameableDeclarationAtPosition(signature, pos) {
                const paramCount = signature.parameters.length - (signatureHasRestParameter(signature) ? 1 : 0);
                if (pos < paramCount) {
                    const decl = signature.parameters[pos].valueDeclaration;
                    return decl && isValidDeclarationForTupleLabel(decl) ? decl : void 0;
                }
                const restParameter = signature.parameters[paramCount] || unknownSymbol;
                const restType = getTypeOfSymbol(restParameter);
                if (isTupleType(restType)) {
                    const associatedNames = restType.target.labeledElementDeclarations;
                    const index = pos - paramCount;
                    return associatedNames && associatedNames[index];
                }
                return restParameter.valueDeclaration && isValidDeclarationForTupleLabel(restParameter.valueDeclaration) ? restParameter.valueDeclaration : void 0;
            }