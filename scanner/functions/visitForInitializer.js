function visitForInitializer(node) {
                if (shouldHoistForInitializer(node)) {
                    let expressions;
                    for (const variable of node.declarations) {
                        expressions = append(expressions, transformInitializedVariable(variable, 
                        /*isExportedDeclaration*/
                        false));
                        if (!variable.initializer) {
                            hoistBindingElement(variable);
                        }
                    }
                    return expressions ? factory2.inlineExpressions(expressions) : factory2.createOmittedExpression();
                }
                else {
                    return visitNode(node, discardedValueVisitor, isForInitializer);
                }
            }