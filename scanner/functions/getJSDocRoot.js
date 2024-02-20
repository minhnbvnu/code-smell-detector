function getJSDocRoot(node) {
            return findAncestor(node.parent, isJSDoc);
        }