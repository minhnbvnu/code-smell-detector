function transformDecoratorsOfClassElements(node, members) {
                let decorationStatements = [];
                addClassElementDecorationStatements(decorationStatements, node, 
                /*isStatic*/
                false);
                addClassElementDecorationStatements(decorationStatements, node, 
                /*isStatic*/
                true);
                if (hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node)) {
                    members = setTextRange(factory2.createNodeArray([
                        ...members,
                        factory2.createClassStaticBlockDeclaration(factory2.createBlock(decorationStatements, 
                        /*multiLine*/
                        true))
                    ]), members);
                    decorationStatements = void 0;
                }
                return { decorationStatements, members };
            }