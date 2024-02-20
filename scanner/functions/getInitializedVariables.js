function getInitializedVariables(node) {
            return filter(node.declarations, isInitializedVariable);
        }