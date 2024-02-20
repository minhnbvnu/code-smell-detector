function createJSDocUnaryTypeWorker(kind, type) {
                const node = createBaseNode(kind);
                node.type = type;
                return node;
            }