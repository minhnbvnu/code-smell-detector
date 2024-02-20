function isLabelOfLabeledStatement(node) {
            var _a2;
            return isIdentifier(node) && ((_a2 = tryCast(node.parent, isLabeledStatement)) == null ? void 0 : _a2.label) === node;
        }