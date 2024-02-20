function getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol) {
                if (!symbol.declarations) {
                    return;
                }
                let result;
                for (const node of symbol.declarations) {
                    if (node.kind === 261 /* InterfaceDeclaration */ || node.kind === 260 /* ClassDeclaration */ || node.kind === 228 /* ClassExpression */ || isJSConstructor(node) || isTypeAlias(node)) {
                        const declaration = node;
                        result = appendTypeParameters(result, getEffectiveTypeParameterDeclarations(declaration));
                    }
                }
                return result;
            }