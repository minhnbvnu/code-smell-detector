function isInsideJsxElementOrAttribute(sourceFile, position) {
            const token = getTokenAtPosition(sourceFile, position);
            if (!token) {
                return false;
            }
            if (token.kind === 11 /* JsxText */) {
                return true;
            }
            if (token.kind === 29 /* LessThanToken */ && token.parent.kind === 11 /* JsxText */) {
                return true;
            }
            if (token.kind === 29 /* LessThanToken */ && token.parent.kind === 291 /* JsxExpression */) {
                return true;
            }
            if (token && token.kind === 19 /* CloseBraceToken */ && token.parent.kind === 291 /* JsxExpression */) {
                return true;
            }
            if (token.kind === 29 /* LessThanToken */ && token.parent.kind === 284 /* JsxClosingElement */) {
                return true;
            }
            return false;
        }