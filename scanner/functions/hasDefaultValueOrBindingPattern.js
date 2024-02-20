function hasDefaultValueOrBindingPattern(node) {
                return node.initializer !== void 0 || isBindingPattern(node.name);
            }