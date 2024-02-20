function spanInPreviousNode(node) {
                return spanInNode(findPrecedingToken(node.pos, sourceFile));
            }