function isNodeBodyBlock(node) {
                return node.type === "BlockStatement" || node.type === "ClassBody" || (node.body && node.body.type === "BlockStatement") ||
                    (node.consequent && node.consequent.type === "BlockStatement");
            }