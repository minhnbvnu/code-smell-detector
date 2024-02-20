function isListCloser(token) {
            const kind = token && token.kind;
            return kind === 19 /* CloseBraceToken */ || kind === 23 /* CloseBracketToken */ || kind === 21 /* CloseParenToken */ || kind === 284 /* JsxClosingElement */;
        }