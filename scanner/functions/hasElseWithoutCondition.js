function hasElseWithoutCondition(node) {
                return node.alternate && node.alternate.type !== "IfStatement";
            }