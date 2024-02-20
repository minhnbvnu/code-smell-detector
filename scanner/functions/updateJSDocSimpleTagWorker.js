function updateJSDocSimpleTagWorker(kind, node, tagName = getDefaultTagName(node), comment) {
                return node.tagName !== tagName || node.comment !== comment ? update(createJSDocSimpleTagWorker(kind, tagName, comment), node) : node;
            }