function symbolHasReadonlyDeclaration(symbol, checker) {
        return (symbol.flags & ts.SymbolFlags.Accessor) === ts.SymbolFlags.GetAccessor ||
            symbol.declarations !== undefined &&
                symbol.declarations.some((node) => util_1.isModifierFlagSet(node, ts.ModifierFlags.Readonly) ||
                    node_1.isVariableDeclaration(node) && util_1.isNodeFlagSet(node.parent, ts.NodeFlags.Const) ||
                    node_1.isCallExpression(node) && util_1.isReadonlyAssignmentDeclaration(node, checker) ||
                    node_1.isEnumMember(node) ||
                    (node_1.isPropertyAssignment(node) || node_1.isShorthandPropertyAssignment(node)) && util_1.isInConstContext(node.parent));
    }