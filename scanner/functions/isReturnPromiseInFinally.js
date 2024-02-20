function isReturnPromiseInFinally(node) {
                let ancestor = node.parent;
                while (ancestor && !ts.isFunctionLike(ancestor)) {
                    if (ts.isTryStatement(ancestor.parent) &&
                        ts.isBlock(ancestor) &&
                        ancestor.parent.end === ancestor.end) {
                        return true;
                    }
                    ancestor = ancestor.parent;
                }
                return false;
            }