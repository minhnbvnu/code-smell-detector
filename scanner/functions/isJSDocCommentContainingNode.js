function isJSDocCommentContainingNode(node) {
            return node.kind === 323 /* JSDoc */ || node.kind === 322 /* JSDocNamepathType */ || node.kind === 324 /* JSDocText */ || isJSDocLinkLike(node) || isJSDocTag(node) || isJSDocTypeLiteral(node) || isJSDocSignature(node);
        }