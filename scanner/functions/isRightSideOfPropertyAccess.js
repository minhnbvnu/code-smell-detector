function isRightSideOfPropertyAccess(node) {
            var _a2;
            return ((_a2 = tryCast(node.parent, isPropertyAccessExpression)) == null ? void 0 : _a2.name) === node;
        }