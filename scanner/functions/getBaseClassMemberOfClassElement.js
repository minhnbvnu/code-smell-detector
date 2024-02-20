function getBaseClassMemberOfClassElement(node, checker) {
        if (!node_1.isClassLikeDeclaration(node.parent))
            return;
        const base = util_1.getBaseOfClassLikeExpression(node.parent);
        if (base === undefined)
            return;
        const name = util_1.getSingleLateBoundPropertyNameOfPropertyName(node.name, checker);
        if (name === undefined)
            return;
        const baseType = checker.getTypeAtLocation(util_1.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword)
            ? base.expression
            : base);
        return getPropertyOfType(baseType, name.symbolName);
    }