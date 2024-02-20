function isArgumentExpressionOfElementAccess(node) {
            var _a2;
            return ((_a2 = tryCast(node.parent, isElementAccessExpression)) == null ? void 0 : _a2.argumentExpression) === node;
        }