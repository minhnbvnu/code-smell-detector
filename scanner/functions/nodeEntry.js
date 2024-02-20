function nodeEntry(node, kind = 1 /* Node */) {
            return {
                kind,
                node: node.name || node,
                context: getContextNodeForNodeEntry(node)
            };
        }