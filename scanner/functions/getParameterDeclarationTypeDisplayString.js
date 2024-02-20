function getParameterDeclarationTypeDisplayString(symbol) {
                const valueDeclaration = symbol.valueDeclaration;
                if (!valueDeclaration || !isParameter(valueDeclaration)) {
                    return void 0;
                }
                const signatureParamType = checker.getTypeOfSymbolAtLocation(symbol, valueDeclaration);
                if (isModuleReferenceType(signatureParamType)) {
                    return void 0;
                }
                return printTypeInSingleLine(signatureParamType);
            }