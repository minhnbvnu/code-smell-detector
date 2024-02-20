function isInsideObjectPattern(node) {
                let { parent } = node;
                while (parent) {
                    if (parent.type === "ObjectPattern") {
                        return true;
                    }
                    parent = parent.parent;
                }
                return false;
            }