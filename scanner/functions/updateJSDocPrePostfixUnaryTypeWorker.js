function updateJSDocPrePostfixUnaryTypeWorker(kind, node, type) {
                return node.type !== type ? update(createJSDocPrePostfixUnaryTypeWorker(kind, type, node.postfix), node) : node;
            }