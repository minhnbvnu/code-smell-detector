function getSingleLateBoundPropertyNameOfPropertyName(node, checker) {
        const staticName = getPropertyName(node);
        if (staticName !== undefined)
            return { displayName: staticName, symbolName: ts.escapeLeadingUnderscores(staticName) };
        if (node.kind === ts.SyntaxKind.PrivateIdentifier)
            return { displayName: node.text, symbolName: checker.getSymbolAtLocation(node).escapedName };
        const { expression } = node;
        return isTsBefore43 && isWellKnownSymbolLiterally(expression)
            ? getPropertyNameOfWellKnownSymbol(expression) // wotan-disable-line no-unstable-api-use
            : type_1.getPropertyNameFromType(checker.getTypeAtLocation(expression));
    }