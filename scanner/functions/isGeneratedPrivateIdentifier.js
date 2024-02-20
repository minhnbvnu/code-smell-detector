function isGeneratedPrivateIdentifier(node) {
            var _a2;
            return isPrivateIdentifier(node) && ((_a2 = node.emitNode) == null ? void 0 : _a2.autoGenerate) !== void 0;
        }