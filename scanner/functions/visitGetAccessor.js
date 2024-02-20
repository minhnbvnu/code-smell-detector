function visitGetAccessor(node, parent2) {
                if (!(node.transformFlags & 1 /* ContainsTypeScript */)) {
                    return node;
                }
                if (!shouldEmitAccessorDeclaration(node)) {
                    return void 0;
                }
                let modifiers = isClassLike(parent2) ? visitNodes2(node.modifiers, visitor, isModifierLike) : visitNodes2(node.modifiers, decoratorElidingVisitor, isModifierLike);
                modifiers = injectClassElementTypeMetadata(modifiers, node, parent2);
                return factory2.updateGetAccessorDeclaration(node, modifiers, visitPropertyNameOfClassElement(node), visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, visitFunctionBody(node.body, visitor, context) || factory2.createBlock([]));
            }