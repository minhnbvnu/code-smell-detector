function scanJsxToken(allowMultilineJsxText = true) {
                startPos = tokenPos = pos;
                if (pos >= end) {
                    return token = 1 /* EndOfFileToken */;
                }
                let char = text.charCodeAt(pos);
                if (char === 60 /* lessThan */) {
                    if (text.charCodeAt(pos + 1) === 47 /* slash */) {
                        pos += 2;
                        return token = 30 /* LessThanSlashToken */;
                    }
                    pos++;
                    return token = 29 /* LessThanToken */;
                }
                if (char === 123 /* openBrace */) {
                    pos++;
                    return token = 18 /* OpenBraceToken */;
                }
                let firstNonWhitespace = 0;
                while (pos < end) {
                    char = text.charCodeAt(pos);
                    if (char === 123 /* openBrace */) {
                        break;
                    }
                    if (char === 60 /* lessThan */) {
                        if (isConflictMarkerTrivia(text, pos)) {
                            pos = scanConflictMarkerTrivia(text, pos, error);
                            return token = 7 /* ConflictMarkerTrivia */;
                        }
                        break;
                    }
                    if (char === 62 /* greaterThan */) {
                        error(Diagnostics.Unexpected_token_Did_you_mean_or_gt, pos, 1);
                    }
                    if (char === 125 /* closeBrace */) {
                        error(Diagnostics.Unexpected_token_Did_you_mean_or_rbrace, pos, 1);
                    }
                    if (isLineBreak(char) && firstNonWhitespace === 0) {
                        firstNonWhitespace = -1;
                    }
                    else if (!allowMultilineJsxText && isLineBreak(char) && firstNonWhitespace > 0) {
                        break;
                    }
                    else if (!isWhiteSpaceLike(char)) {
                        firstNonWhitespace = pos;
                    }
                    pos++;
                }
                tokenValue = text.substring(startPos, pos);
                return firstNonWhitespace === -1 ? 12 /* JsxTextAllWhiteSpaces */ : 11 /* JsxText */;
            }