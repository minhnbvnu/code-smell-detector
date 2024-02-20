function isInsideForLoopInitializer(node) {
                if (node && node.parent) {
                    if (node.parent.type === "ForStatement" && node.parent.init === node) {
                        return true;
                    }
                    return isInsideForLoopInitializer(node.parent);
                }
                return false;
            }