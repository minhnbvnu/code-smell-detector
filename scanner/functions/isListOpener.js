function isListOpener(token) {
            const kind = token && token.kind;
            return kind === 18 /* OpenBraceToken */ || kind === 22 /* OpenBracketToken */ || kind === 20 /* OpenParenToken */ || kind === 283 /* JsxOpeningElement */;
        }