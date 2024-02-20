function hasErrorHandler(node) {
                let ancestor = node;
                while (!astUtils.isFunction(ancestor) && ancestor.type !== "Program") {
                    if (ancestor.parent.type === "TryStatement" && (ancestor === ancestor.parent.block || ancestor === ancestor.parent.handler && ancestor.parent.finalizer)) {
                        return true;
                    }
                    ancestor = ancestor.parent;
                }
                return false;
            }