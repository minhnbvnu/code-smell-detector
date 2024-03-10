function isIdentifierReference(node) {
        const parent = node.parent;
        switch (parent.type) {
            case "LabeledStatement":
            case "BreakStatement":
            case "ContinueStatement":
            case "ArrayPattern":
            case "RestElement":
            case "ImportSpecifier":
            case "ImportDefaultSpecifier":
            case "ImportNamespaceSpecifier":
            case "CatchClause":
                return false;
            case "FunctionDeclaration":
            case "FunctionExpression":
            case "ArrowFunctionExpression":
            case "ClassDeclaration":
            case "ClassExpression":
            case "VariableDeclarator":
                return parent.id !== node;
            case "Property":
            case "PropertyDefinition":
            case "MethodDefinition":
                return (parent.key !== node ||
                    parent.computed ||
                    parent.shorthand);
            case "AssignmentPattern":
                return parent.key !== node;
            default:
                return true;
        }
    }