function isRightSideOfQualifiedName(node) {
            var _a2;
            return ((_a2 = tryCast(node.parent, isQualifiedName)) == null ? void 0 : _a2.right) === node;
        }