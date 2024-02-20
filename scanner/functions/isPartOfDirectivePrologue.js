function isPartOfDirectivePrologue(node) {
                const block = node.parent.parent;
                if (block.type !== "Program" && (block.type !== "BlockStatement" || !astUtils.isFunction(block.parent))) {
                    return false;
                }
                // Check the node is at a prologue.
                for (let i = 0; i < block.body.length; ++i) {
                    const statement = block.body[i];
                    if (statement === node.parent) {
                        return true;
                    }
                    if (!isDirective(statement)) {
                        break;
                    }
                }
                return false;
            }