function enterDeclaration(node) {
                namespacesInScope.push(esTreeNodeToTSNodeMap.get(node));
            }