function containsArgumentsReference(declaration) {
                const links = getNodeLinks(declaration);
                if (links.containsArgumentsReference === void 0) {
                    if (links.flags & 512 /* CaptureArguments */) {
                        links.containsArgumentsReference = true;
                    }
                    else {
                        links.containsArgumentsReference = traverse(declaration.body);
                    }
                }
                return links.containsArgumentsReference;
                function traverse(node) {
                    if (!node)
                        return false;
                    switch (node.kind) {
                        case 79 /* Identifier */:
                            return node.escapedText === argumentsSymbol.escapedName && getReferencedValueSymbol(node) === argumentsSymbol;
                        case 169 /* PropertyDeclaration */:
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            return node.name.kind === 164 /* ComputedPropertyName */ && traverse(node.name);
                        case 208 /* PropertyAccessExpression */:
                        case 209 /* ElementAccessExpression */:
                            return traverse(node.expression);
                        case 299 /* PropertyAssignment */:
                            return traverse(node.initializer);
                        default:
                            return !nodeStartsNewLexicalEnvironment(node) && !isPartOfTypeNode(node) && !!forEachChild(node, traverse);
                    }
                }
            }