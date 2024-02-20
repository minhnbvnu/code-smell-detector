function expected_relation(node, message) {
        if (node.assign) {
            warn(message || bundle.conditional_assignment, node);
        }
        return node;
    }