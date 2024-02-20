function spanForObjectOrArrayLiteral(node, open = 18 /* OpenBraceToken */) {
                return spanForNode(node, 
                /*autoCollapse*/
                false, 
                /*useFullStart*/
                !isArrayLiteralExpression(node.parent) && !isCallExpression(node.parent), open);
            }