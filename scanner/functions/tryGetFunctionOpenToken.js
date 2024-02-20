function tryGetFunctionOpenToken(node, body, sourceFile) {
            if (isNodeArrayMultiLine(node.parameters, sourceFile)) {
                const openParenToken = findChildOfKind(node, 20 /* OpenParenToken */, sourceFile);
                if (openParenToken) {
                    return openParenToken;
                }
            }
            return findChildOfKind(body, 18 /* OpenBraceToken */, sourceFile);
        }