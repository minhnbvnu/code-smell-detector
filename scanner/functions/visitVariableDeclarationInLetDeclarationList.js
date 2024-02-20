function visitVariableDeclarationInLetDeclarationList(node) {
                const name = node.name;
                if (isBindingPattern(name)) {
                    return visitVariableDeclaration(node);
                }
                if (!node.initializer && shouldEmitExplicitInitializerForLetDeclaration(node)) {
                    return factory2.updateVariableDeclaration(node, node.name, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createVoidZero());
                }
                return visitEachChild(node, visitor, context);
            }