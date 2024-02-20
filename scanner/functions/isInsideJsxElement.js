function isInsideJsxElement(sourceFile, position) {
            function isInsideJsxElementTraversal(node) {
                while (node) {
                    if (node.kind >= 282 /* JsxSelfClosingElement */ && node.kind <= 291 /* JsxExpression */ || node.kind === 11 /* JsxText */ || node.kind === 29 /* LessThanToken */ || node.kind === 31 /* GreaterThanToken */ || node.kind === 79 /* Identifier */ || node.kind === 19 /* CloseBraceToken */ || node.kind === 18 /* OpenBraceToken */ || node.kind === 43 /* SlashToken */) {
                        node = node.parent;
                    }
                    else if (node.kind === 281 /* JsxElement */) {
                        if (position > node.getStart(sourceFile))
                            return true;
                        node = node.parent;
                    }
                    else {
                        return false;
                    }
                }
                return false;
            }
            return isInsideJsxElementTraversal(getTokenAtPosition(sourceFile, position));
        }