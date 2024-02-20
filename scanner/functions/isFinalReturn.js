function isFinalReturn(node) {
                // the parent must be a block
                const block = util.nullThrows(node.parent, util.NullThrowsReasons.MissingParent);
                if (block.type !== utils_1.AST_NODE_TYPES.BlockStatement) {
                    // e.g. `if (cond) return;` (not in a block)
                    return false;
                }
                // the block's parent must be a function
                const blockParent = util.nullThrows(block.parent, util.NullThrowsReasons.MissingParent);
                if (![
                    utils_1.AST_NODE_TYPES.FunctionDeclaration,
                    utils_1.AST_NODE_TYPES.FunctionExpression,
                    utils_1.AST_NODE_TYPES.ArrowFunctionExpression,
                ].includes(blockParent.type)) {
                    // e.g. `if (cond) { return; }`
                    // not in a top-level function block
                    return false;
                }
                // must be the last child of the block
                if (block.body.indexOf(node) < block.body.length - 1) {
                    // not the last statement in the block
                    return false;
                }
                return true;
            }