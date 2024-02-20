function isOnFirstLineOfStatement(token, leafNode) {
                let node = leafNode;
                while (node.parent && !node.parent.type.endsWith("Statement") && !node.parent.type.endsWith("Declaration")) {
                    node = node.parent;
                }
                node = node.parent;
                return !node || node.loc.start.line === token.loc.start.line;
            }