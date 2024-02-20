function isJumpStatementTarget(node) {
            var _a2;
            return isIdentifier(node) && ((_a2 = tryCast(node.parent, isBreakOrContinueStatement)) == null ? void 0 : _a2.label) === node;
        }