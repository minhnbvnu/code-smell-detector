function getContextualTypeForInitializerExpression(node, contextFlags) {
                const declaration = node.parent;
                if (hasInitializer(declaration) && node === declaration.initializer) {
                    const result = getContextualTypeForVariableLikeDeclaration(declaration, contextFlags);
                    if (result) {
                        return result;
                    }
                    if (!(contextFlags & 8 /* SkipBindingPatterns */) && isBindingPattern(declaration.name) && declaration.name.elements.length > 0) {
                        return getTypeFromBindingPattern(declaration.name, 
                        /*includePatternInType*/
                        true, 
                        /*reportErrors*/
                        false);
                    }
                }
                return void 0;
            }