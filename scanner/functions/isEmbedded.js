function isEmbedded(node) {
                if (!node.parent) {
                    return false;
                }
                if (node !== node.parent.value) {
                    return false;
                }
                if (node.parent.type === "MethodDefinition") {
                    return true;
                }
                if (node.parent.type === "Property") {
                    return node.parent.method === true || node.parent.kind === "get" || node.parent.kind === "set";
                }
                return false;
            }