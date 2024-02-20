function isTagName(node) {
            var _a2;
            return ((_a2 = tryCast(node.parent, isJSDocTag)) == null ? void 0 : _a2.tagName) === node;
        }