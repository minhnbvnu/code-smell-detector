function visitConstructor(node) {
                if (!shouldEmitFunctionLikeDeclaration(node)) {
                    return void 0;
                }
                return factory2.updateConstructorDeclaration(node, 
                /*modifiers*/
                void 0, visitParameterList(node.parameters, visitor, context), transformConstructorBody(node.body, node));
            }