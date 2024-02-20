function hasFinallyBlock(node) {
                let ancestor = node.parent;
                while (ancestor && !ts.isFunctionLike(ancestor)) {
                    if (ts.isTryStatement(ancestor)) {
                        return !!ancestor.finallyBlock;
                    }
                    ancestor = ancestor.parent;
                }
                return false;
            }