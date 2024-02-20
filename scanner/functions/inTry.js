function inTry(node) {
                let ancestor = node.parent;
                while (ancestor && !ts.isFunctionLike(ancestor)) {
                    if (ts.isTryStatement(ancestor)) {
                        return true;
                    }
                    ancestor = ancestor.parent;
                }
                return false;
            }