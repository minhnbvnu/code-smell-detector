function getSourceMapRange(node) {
            var _a2, _b;
            return (_b = (_a2 = node.emitNode) == null ? void 0 : _a2.sourceMapRange) != null ? _b : node;
        }