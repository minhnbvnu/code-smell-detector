function getTypeParametersFromDeclaration(declaration) {
                var _a2;
                let result;
                for (const node of getEffectiveTypeParameterDeclarations(declaration)) {
                    result = appendIfUnique(result, getDeclaredTypeOfTypeParameter(node.symbol));
                }
                return (result == null ? void 0 : result.length) ? result : isFunctionDeclaration(declaration) ? (_a2 = getSignatureOfTypeTag(declaration)) == null ? void 0 : _a2.typeParameters : void 0;
            }