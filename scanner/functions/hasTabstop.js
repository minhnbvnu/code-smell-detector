function hasTabstop(node) {
            var _a2;
            return ((_a2 = getSnippetElement(node)) == null ? void 0 : _a2.kind) === 0 /* TabStop */;
        }