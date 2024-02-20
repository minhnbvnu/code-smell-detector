function substituteShorthandPropertyAssignment(node) {
                var _a2, _b;
                const name = node.name;
                if (!isGeneratedIdentifier(name) && !isLocalName(name)) {
                    const importDeclaration = resolver.getReferencedImportDeclaration(name);
                    if (importDeclaration) {
                        if (isImportClause(importDeclaration)) {
                            return setTextRange(factory2.createPropertyAssignment(factory2.cloneNode(name), factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(importDeclaration.parent), factory2.createIdentifier("default"))), 
                            /*location*/
                            node);
                        }
                        else if (isImportSpecifier(importDeclaration)) {
                            return setTextRange(factory2.createPropertyAssignment(factory2.cloneNode(name), factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(((_b = (_a2 = importDeclaration.parent) == null ? void 0 : _a2.parent) == null ? void 0 : _b.parent) || importDeclaration), factory2.cloneNode(importDeclaration.propertyName || importDeclaration.name))), 
                            /*location*/
                            node);
                        }
                    }
                }
                return node;
            }