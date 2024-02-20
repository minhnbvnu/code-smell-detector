function reset_block_variables(compressor, node) {
            if (node.block_scope)
                node.block_scope.variables.forEach((def) => {
                    reset_def(compressor, def);
                });
        }