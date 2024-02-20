function scanJsDocToken() {
                startPos = tokenPos = pos;
                tokenFlags = 0 /* None */;
                if (pos >= end) {
                    return token = 1 /* EndOfFileToken */;
                }
                const ch = codePointAt(text, pos);
                pos += charSize(ch);
                switch (ch) {
                    case 9 /* tab */:
                    case 11 /* verticalTab */:
                    case 12 /* formFeed */:
                    case 32 /* space */:
                        while (pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos))) {
                            pos++;
                        }
                        return token = 5 /* WhitespaceTrivia */;
                    case 64 /* at */:
                        return token = 59 /* AtToken */;
                    case 13 /* carriageReturn */:
                        if (text.charCodeAt(pos) === 10 /* lineFeed */) {
                            pos++;
                        }
                    case 10 /* lineFeed */:
                        tokenFlags |= 1 /* PrecedingLineBreak */;
                        return token = 4 /* NewLineTrivia */;
                    case 42 /* asterisk */:
                        return token = 41 /* AsteriskToken */;
                    case 123 /* openBrace */:
                        return token = 18 /* OpenBraceToken */;
                    case 125 /* closeBrace */:
                        return token = 19 /* CloseBraceToken */;
                    case 91 /* openBracket */:
                        return token = 22 /* OpenBracketToken */;
                    case 93 /* closeBracket */:
                        return token = 23 /* CloseBracketToken */;
                    case 60 /* lessThan */:
                        return token = 29 /* LessThanToken */;
                    case 62 /* greaterThan */:
                        return token = 31 /* GreaterThanToken */;
                    case 61 /* equals */:
                        return token = 63 /* EqualsToken */;
                    case 44 /* comma */:
                        return token = 27 /* CommaToken */;
                    case 46 /* dot */:
                        return token = 24 /* DotToken */;
                    case 96 /* backtick */:
                        return token = 61 /* BacktickToken */;
                    case 35 /* hash */:
                        return token = 62 /* HashToken */;
                    case 92 /* backslash */:
                        pos--;
                        const extendedCookedChar = peekExtendedUnicodeEscape();
                        if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar, languageVersion)) {
                            pos += 3;
                            tokenFlags |= 8 /* ExtendedUnicodeEscape */;
                            tokenValue = scanExtendedUnicodeEscape() + scanIdentifierParts();
                            return token = getIdentifierToken();
                        }
                        const cookedChar = peekUnicodeEscape();
                        if (cookedChar >= 0 && isIdentifierStart(cookedChar, languageVersion)) {
                            pos += 6;
                            tokenFlags |= 1024 /* UnicodeEscape */;
                            tokenValue = String.fromCharCode(cookedChar) + scanIdentifierParts();
                            return token = getIdentifierToken();
                        }
                        pos++;
                        return token = 0 /* Unknown */;
                }
                if (isIdentifierStart(ch, languageVersion)) {
                    let char = ch;
                    while (pos < end && isIdentifierPart(char = codePointAt(text, pos), languageVersion) || text.charCodeAt(pos) === 45 /* minus */)
                        pos += charSize(char);
                    tokenValue = text.substring(tokenPos, pos);
                    if (char === 92 /* backslash */) {
                        tokenValue += scanIdentifierParts();
                    }
                    return token = getIdentifierToken();
                }
                else {
                    return token = 0 /* Unknown */;
                }
            }