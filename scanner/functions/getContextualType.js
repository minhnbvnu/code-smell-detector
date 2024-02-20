function getContextualType(checker, node) {
        const parent = node.parent;
        if (!parent) {
            return;
        }
        if ((0, tsutils_1.isCallExpression)(parent) || (0, tsutils_1.isNewExpression)(parent)) {
            if (node === parent.expression) {
                // is the callee, so has no contextual type
                return;
            }
        }
        else if ((0, tsutils_1.isVariableDeclaration)(parent) ||
            (0, tsutils_1.isPropertyDeclaration)(parent) ||
            (0, tsutils_1.isParameterDeclaration)(parent)) {
            return parent.type ? checker.getTypeFromTypeNode(parent.type) : undefined;
        }
        else if ((0, tsutils_1.isJsxExpression)(parent)) {
            return checker.getContextualType(parent);
        }
        else if ((0, tsutils_1.isPropertyAssignment)(parent) && (0, tsutils_1.isIdentifier)(node)) {
            return checker.getContextualType(node);
        }
        else if ((0, tsutils_1.isBinaryExpression)(parent) &&
            parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
            parent.right === node) {
            // is RHS of assignment
            return checker.getTypeAtLocation(parent.left);
        }
        else if (![ts.SyntaxKind.TemplateSpan, ts.SyntaxKind.JsxExpression].includes(parent.kind)) {
            // parent is not something we know we can get the contextual type of
            return;
        }
        // TODO - support return statement checking
        return checker.getContextualType(node);
    }