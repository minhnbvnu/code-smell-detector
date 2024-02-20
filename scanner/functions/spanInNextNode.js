function spanInNextNode(node) {
                return spanInNode(findNextToken(node, node.parent, sourceFile));
            }