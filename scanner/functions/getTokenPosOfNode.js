function getTokenPosOfNode(node, sourceFile, includeJsDoc) {
            if (nodeIsMissing(node)) {
                return node.pos;
            }
            if (isJSDocNode(node) || node.kind === 11 /* JsxText */) {
                return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos, 
                /*stopAfterLineBreak*/
                false, 
                /*stopAtComments*/
                true);
            }
            if (includeJsDoc && hasJSDocNodes(node)) {
                return getTokenPosOfNode(node.jsDoc[0], sourceFile);
            }
            if (node.kind === 354 /* SyntaxList */ && node._children.length > 0) {
                return getTokenPosOfNode(node._children[0], sourceFile, includeJsDoc);
            }
            return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos, 
            /*stopAfterLineBreak*/
            false, 
            /*stopAtComments*/
            false, isInJSDoc(node));
        }