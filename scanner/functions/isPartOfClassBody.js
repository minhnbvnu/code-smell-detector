function isPartOfClassBody(declaration, node) {
                let currentNode = getParseTreeNode(node);
                if (!currentNode || currentNode === declaration || currentNode.end <= declaration.pos || currentNode.pos >= declaration.end) {
                    return false;
                }
                const blockScope = getEnclosingBlockScopeContainer(declaration);
                while (currentNode) {
                    if (currentNode === blockScope || currentNode === declaration) {
                        return false;
                    }
                    if (isClassElement(currentNode) && currentNode.parent === declaration) {
                        return true;
                    }
                    currentNode = currentNode.parent;
                }
                return false;
            }