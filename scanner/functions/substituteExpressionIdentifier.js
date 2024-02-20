function substituteExpressionIdentifier(node) {
                var _a2, _b;
                if (getEmitFlags(node) & 8192 /* HelperName */) {
                    const externalHelpersModuleName = getExternalHelpersModuleName(currentSourceFile);
                    if (externalHelpersModuleName) {
                        return factory2.createPropertyAccessExpression(externalHelpersModuleName, node);
                    }
                    return node;
                }
                if (!isGeneratedIdentifier(node) && !isLocalName(node)) {
                    const importDeclaration = resolver.getReferencedImportDeclaration(node);
                    if (importDeclaration) {
                        if (isImportClause(importDeclaration)) {
                            return setTextRange(factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(importDeclaration.parent), factory2.createIdentifier("default")), 
                            /*location*/
                            node);
                        }
                        else if (isImportSpecifier(importDeclaration)) {
                            return setTextRange(factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(((_b = (_a2 = importDeclaration.parent) == null ? void 0 : _a2.parent) == null ? void 0 : _b.parent) || importDeclaration), factory2.cloneNode(importDeclaration.propertyName || importDeclaration.name)), 
                            /*location*/
                            node);
                        }
                    }
                }
                return node;
            }