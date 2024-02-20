function checkForSemicolonForVariableDeclaration(node) {
                const parent = node.parent;
                if ((parent.type !== "ForStatement" || parent.init !== node) &&
                    (!/^For(?:In|Of)Statement/u.test(parent.type) || parent.left !== node)) {
                    checkForSemicolon(node);
                }
            }