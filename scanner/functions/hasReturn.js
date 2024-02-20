function hasReturn(node, options) {
            return !!(options == null ? void 0 : options.generateReturnInDocTemplate) && (isFunctionTypeNode(node) || isArrowFunction(node) && isExpression(node.body) || isFunctionLikeDeclaration(node) && node.body && isBlock(node.body) && !!forEachReturnStatement(node.body, (n) => n));
        }