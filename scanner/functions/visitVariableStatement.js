function visitVariableStatement(node) {
                if (!shouldHoistVariableDeclarationList(node.declarationList)) {
                    return visitNode(node, visitor, isStatement);
                }
                let expressions;
                const isExportedDeclaration = hasSyntacticModifier(node, 1 /* Export */);
                const isMarkedDeclaration = hasAssociatedEndOfDeclarationMarker(node);
                for (const variable of node.declarationList.declarations) {
                    if (variable.initializer) {
                        expressions = append(expressions, transformInitializedVariable(variable, isExportedDeclaration && !isMarkedDeclaration));
                    }
                    else {
                        hoistBindingElement(variable);
                    }
                }
                let statements;
                if (expressions) {
                    statements = append(statements, setTextRange(factory2.createExpressionStatement(factory2.inlineExpressions(expressions)), node));
                }
                if (isMarkedDeclaration) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node, isExportedDeclaration);
                }
                else {
                    statements = appendExportsOfVariableStatement(statements, node, 
                    /*exportSelf*/
                    false);
                }
                return singleOrMany(statements);
            }