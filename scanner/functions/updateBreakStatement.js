function updateBreakStatement(node, label) {
                return node.label !== label ? update(createBreakStatement(label), node) : node;
            }