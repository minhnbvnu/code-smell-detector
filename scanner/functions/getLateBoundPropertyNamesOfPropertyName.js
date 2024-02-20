function getLateBoundPropertyNamesOfPropertyName(node, checker) {
        const staticName = getPropertyName(node);
        return staticName !== undefined
            ? { known: true, names: [{ displayName: staticName, symbolName: ts.escapeLeadingUnderscores(staticName) }] }
            : node.kind === ts.SyntaxKind.PrivateIdentifier
                ? { known: true, names: [{ displayName: node.text, symbolName: checker.getSymbolAtLocation(node).escapedName }] }
                : getLateBoundPropertyNames(node.expression, checker);
    }