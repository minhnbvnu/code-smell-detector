function getEsNodesFromViolatingNode(violatingNode) {
                if (ts.isParameterPropertyDeclaration(violatingNode, violatingNode.parent)) {
                    return {
                        esNode: parserServices.tsNodeToESTreeNodeMap.get(violatingNode.name),
                        nameNode: parserServices.tsNodeToESTreeNodeMap.get(violatingNode.name),
                    };
                }
                return {
                    esNode: parserServices.tsNodeToESTreeNodeMap.get(violatingNode),
                    nameNode: parserServices.tsNodeToESTreeNodeMap.get(violatingNode.name),
                };
            }