function getParentNodeInSpan(node, file, span) {
            if (!node)
                return void 0;
            while (node.parent) {
                if (isSourceFile(node.parent) || !spanContainsNode(span, node.parent, file)) {
                    return node;
                }
                node = node.parent;
            }
        }