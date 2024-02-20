function checkVariableDeclarator(node) {
                // Skip if variable is declared without assignment
                if (!node.init) {
                    return;
                }
                // We only care about member expressions past this point
                if (node.init.type !== "MemberExpression") {
                    return;
                }
                performCheck(node.id, node.init, node);
            }