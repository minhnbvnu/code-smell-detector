function reScanInvalidIdentifier() {
                Debug.assert(token === 0 /* Unknown */, "'reScanInvalidIdentifier' should only be called when the current token is 'SyntaxKind.Unknown'.");
                pos = tokenPos = startPos;
                tokenFlags = 0;
                const ch = codePointAt(text, pos);
                const identifierKind = scanIdentifier(ch, 99 /* ESNext */);
                if (identifierKind) {
                    return token = identifierKind;
                }
                pos += charSize(ch);
                return token;
            }