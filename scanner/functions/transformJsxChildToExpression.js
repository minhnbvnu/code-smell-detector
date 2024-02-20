function transformJsxChildToExpression(node) {
                switch (node.kind) {
                    case 11 /* JsxText */:
                        return visitJsxText(node);
                    case 291 /* JsxExpression */:
                        return visitJsxExpression(node);
                    case 281 /* JsxElement */:
                        return visitJsxElement(node, 
                        /*isChild*/
                        true);
                    case 282 /* JsxSelfClosingElement */:
                        return visitJsxSelfClosingElement(node, 
                        /*isChild*/
                        true);
                    case 285 /* JsxFragment */:
                        return visitJsxFragment(node, 
                        /*isChild*/
                        true);
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
            }