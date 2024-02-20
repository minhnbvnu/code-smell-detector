function getStarToken(node) {
                return sourceCode.getFirstToken((node.parent.method || node.parent.type === "MethodDefinition") ? node.parent : node, isStarToken);
            }