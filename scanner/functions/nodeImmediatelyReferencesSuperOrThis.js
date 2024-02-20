function nodeImmediatelyReferencesSuperOrThis(node) {
                if (node.kind === 106 /* SuperKeyword */ || node.kind === 108 /* ThisKeyword */) {
                    return true;
                }
                if (isThisContainerOrFunctionBlock(node)) {
                    return false;
                }
                return !!forEachChild(node, nodeImmediatelyReferencesSuperOrThis);
            }