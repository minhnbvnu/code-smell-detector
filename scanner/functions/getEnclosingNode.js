function getEnclosingNode(node, isJS) {
            return findAncestor(node, isStatement) || (isJS ? findAncestor(node, isJSDoc) : void 0);
        }