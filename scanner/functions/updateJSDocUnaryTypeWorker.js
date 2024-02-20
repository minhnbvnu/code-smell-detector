function updateJSDocUnaryTypeWorker(kind, node, type) {
                return node.type !== type ? update(createJSDocUnaryTypeWorker(kind, type), node) : node;
            }