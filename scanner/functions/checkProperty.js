function checkProperty(node) {
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                if (ts.isPropertyAssignment(tsNode)) {
                    const contextualType = checker.getContextualType(tsNode.initializer);
                    if (contextualType !== undefined &&
                        isVoidReturningFunctionType(checker, tsNode.initializer, contextualType) &&
                        returnsThenable(checker, tsNode.initializer)) {
                        context.report({
                            messageId: 'voidReturnProperty',
                            node: node.value,
                        });
                    }
                }
                else if (ts.isShorthandPropertyAssignment(tsNode)) {
                    const contextualType = checker.getContextualType(tsNode.name);
                    if (contextualType !== undefined &&
                        isVoidReturningFunctionType(checker, tsNode.name, contextualType) &&
                        returnsThenable(checker, tsNode.name)) {
                        context.report({
                            messageId: 'voidReturnProperty',
                            node: node.value,
                        });
                    }
                }
                else if (ts.isMethodDeclaration(tsNode)) {
                    if (ts.isComputedPropertyName(tsNode.name)) {
                        return;
                    }
                    const obj = tsNode.parent;
                    // Below condition isn't satisfied unless something goes wrong,
                    // but is needed for type checking.
                    // 'node' does not include class method declaration so 'obj' is
                    // always an object literal expression, but after converting 'node'
                    // to TypeScript AST, its type includes MethodDeclaration which
                    // does include the case of class method declaration.
                    if (!ts.isObjectLiteralExpression(obj)) {
                        return;
                    }
                    const objType = checker.getContextualType(obj);
                    if (objType === undefined) {
                        return;
                    }
                    const propertySymbol = checker.getPropertyOfType(objType, tsNode.name.text);
                    if (propertySymbol === undefined) {
                        return;
                    }
                    const contextualType = checker.getTypeOfSymbolAtLocation(propertySymbol, tsNode.name);
                    if (isVoidReturningFunctionType(checker, tsNode.name, contextualType) &&
                        returnsThenable(checker, tsNode)) {
                        context.report({
                            messageId: 'voidReturnProperty',
                            node: node.value,
                        });
                    }
                    return;
                }
            }