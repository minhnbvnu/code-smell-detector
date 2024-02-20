function inCatch(node) {
                let ancestor = node.parent;
                while (ancestor && !ts.isFunctionLike(ancestor)) {
                    if (ts.isCatchClause(ancestor)) {
                        return true;
                    }
                    ancestor = ancestor.parent;
                }
                return false;
            }