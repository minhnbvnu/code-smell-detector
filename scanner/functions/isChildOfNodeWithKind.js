function isChildOfNodeWithKind(node, kind) {
            while (node) {
                if (node.kind === kind) {
                    return true;
                }
                node = node.parent;
            }
            return false;
        }