function getFunctionHeadLoc(node, sourceCode) {
        const parent = util.nullThrows(node.parent, util.NullThrowsReasons.MissingParent);
        let start = null;
        let end = null;
        if (node.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression) {
            const arrowToken = util.nullThrows(sourceCode.getTokenBefore(node.body, util.isArrowToken), util.NullThrowsReasons.MissingToken('=>', node.type));
            start = arrowToken.loc.start;
            end = arrowToken.loc.end;
        }
        else if (parent.type === utils_1.AST_NODE_TYPES.Property ||
            parent.type === utils_1.AST_NODE_TYPES.MethodDefinition) {
            start = parent.loc.start;
            end = getOpeningParenOfParams(node, sourceCode).loc.start;
        }
        else {
            start = node.loc.start;
            end = getOpeningParenOfParams(node, sourceCode).loc.start;
        }
        return {
            start,
            end,
        };
    }