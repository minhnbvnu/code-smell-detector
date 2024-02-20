function getFunctionHeadLocation(node, sourceCode) {
        const parent = node.parent;
        let start = null;
        let end = null;
        if (node.type === "ArrowFunctionExpression") {
            const arrowToken = sourceCode.getTokenBefore(node.body, isArrowToken);
            start = arrowToken.loc.start;
            end = arrowToken.loc.end;
        }
        else if (parent.type === "Property" ||
            parent.type === "MethodDefinition" ||
            parent.type === "PropertyDefinition") {
            start = parent.loc.start;
            end = getOpeningParenOfParams(node, sourceCode).loc.start;
        }
        else {
            start = node.loc.start;
            end = getOpeningParenOfParams(node, sourceCode).loc.start;
        }
        return {
            start: { ...start },
            end: { ...end },
        };
    }