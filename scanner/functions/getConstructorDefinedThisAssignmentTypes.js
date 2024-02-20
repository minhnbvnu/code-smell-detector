function getConstructorDefinedThisAssignmentTypes(types, declarations) {
                Debug.assert(types.length === declarations.length);
                return types.filter((_, i) => {
                    const declaration = declarations[i];
                    const expression = isBinaryExpression(declaration) ? declaration : isBinaryExpression(declaration.parent) ? declaration.parent : void 0;
                    return expression && isDeclarationInConstructor(expression);
                });
            }