function declarations_only(node) {
                return node.definitions.every((var_def) => !var_def.value);
            }