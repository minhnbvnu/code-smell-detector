function hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node) {
                for (const member of node.members) {
                    if (!canHaveDecorators(member))
                        continue;
                    const allDecorators = getAllDecoratorsOfClassElement(member, node, 
                    /*useLegacyDecorators*/
                    true);
                    if (some(allDecorators == null ? void 0 : allDecorators.decorators, decoratorContainsPrivateIdentifierInExpression))
                        return true;
                    if (some(allDecorators == null ? void 0 : allDecorators.parameters, parameterDecoratorsContainPrivateIdentifierInExpression))
                        return true;
                }
                return false;
            }