function isInFlaggedContext(node) {
                if (node.parent.type === "ChainExpression") {
                    return isInFlaggedContext(node.parent);
                }
                return isInBooleanContext(node) ||
                    (isLogicalContext(node.parent) &&
                        // For nested logical statements
                        isInFlaggedContext(node.parent));
            }