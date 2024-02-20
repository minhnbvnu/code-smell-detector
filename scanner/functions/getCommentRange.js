function getCommentRange(node) {
            var _a2, _b;
            return (_b = (_a2 = node.emitNode) == null ? void 0 : _a2.commentRange) != null ? _b : node;
        }