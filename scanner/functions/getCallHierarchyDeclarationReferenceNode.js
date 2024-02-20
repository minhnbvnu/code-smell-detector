function getCallHierarchyDeclarationReferenceNode(node) {
            if (isSourceFile(node))
                return node;
            if (isNamedDeclaration(node))
                return node.name;
            if (isConstNamedExpression(node))
                return node.parent.name;
            return Debug.checkDefined(node.modifiers && find(node.modifiers, isDefaultModifier3));
        }