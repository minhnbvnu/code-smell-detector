function getNodeForGeneratedName(name) {
            var _a2;
            const autoGenerate = name.emitNode.autoGenerate;
            if (autoGenerate.flags & 4 /* Node */) {
                const autoGenerateId = autoGenerate.id;
                let node = name;
                let original = node.original;
                while (original) {
                    node = original;
                    const autoGenerate2 = (_a2 = node.emitNode) == null ? void 0 : _a2.autoGenerate;
                    if (isMemberName(node) && (autoGenerate2 === void 0 || !!(autoGenerate2.flags & 4 /* Node */) && autoGenerate2.id !== autoGenerateId)) {
                        break;
                    }
                    original = node.original;
                }
                return node;
            }
            return name;
        }