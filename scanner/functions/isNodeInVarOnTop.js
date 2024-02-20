function isNodeInVarOnTop(node, varNode) {
                return varNode &&
                    varNode.parent.loc.start.line === node.loc.start.line &&
                    varNode.parent.declarations.length > 1;
            }