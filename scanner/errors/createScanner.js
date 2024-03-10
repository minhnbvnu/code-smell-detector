function createScanner(languageVersion, skipTrivia2, languageVariant = 0 /* Standard */, textInitial, onError, start, length2) {
            function scanEscapeSequence(isTaggedTemplate) {
                const start2 = pos;
                pos++;
                if (pos >= end) {
                    error(Diagnostics.Unexpected_end_of_text);
                    return "";
                }
                const ch = text.charCodeAt(pos);
                pos++;
                switch (ch) {
                    case 48 /* _0 */:
                        if (isTaggedTemplate && pos < end && isDigit(text.charCodeAt(pos))) {
                            pos++;
                            tokenFlags |= 2048 /* ContainsInvalidEscape */;
                            return text.substring(start2, pos);
                        }
                        return "\0";
                    case 98 /* b */:
                        return "\b";
                    case 116 /* t */:
                        return "	";
                    case 110 /* n */:
                        return "\n";
                    case 118 /* v */:
                        return "\v";
                    case 102 /* f */:
                        return "\f";
                    case 114 /* r */:
                        return "\r";
                    case 39 /* singleQuote */:
                        return "'";
                    case 34 /* doubleQuote */:
                        return '"';
                    case 117 /* u */:
                        if (isTaggedTemplate) {
                            for (let escapePos = pos; escapePos < pos + 4; escapePos++) {
                                if (escapePos < end && !isHexDigit(text.charCodeAt(escapePos)) && text.charCodeAt(escapePos) !== 123 /* openBrace */) {
                                    pos = escapePos;
                                    tokenFlags |= 2048 /* ContainsInvalidEscape */;
                                    return text.substring(start2, pos);
                                }
                            }
                        }
                        if (pos < end && text.charCodeAt(pos) === 123 /* openBrace */) {
                            pos++;
                            if (isTaggedTemplate && !isHexDigit(text.charCodeAt(pos))) {
                                tokenFlags |= 2048 /* ContainsInvalidEscape */;
                                return text.substring(start2, pos);
                            }
                            if (isTaggedTemplate) {
                                const savePos = pos;
                                const escapedValueString = scanMinimumNumberOfHexDigits(1, 
                                /*canHaveSeparators*/
                                false);
                                const escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
                                if (!isCodePoint(escapedValue) || text.charCodeAt(pos) !== 125 /* closeBrace */) {
                                    tokenFlags |= 2048 /* ContainsInvalidEscape */;
                                    return text.substring(start2, pos);
                                }
                                else {
                                    pos = savePos;
                                }
                            }
                            tokenFlags |= 8 /* ExtendedUnicodeEscape */;
                            return scanExtendedUnicodeEscape();
                        }
                        tokenFlags |= 1024 /* UnicodeEscape */;
                        return scanHexadecimalEscape(
                        /*numDigits*/
                        4);
                    case 120 /* x */:
                        if (isTaggedTemplate) {
                            if (!isHexDigit(text.charCodeAt(pos))) {
                                tokenFlags |= 2048 /* ContainsInvalidEscape */;
                                return text.substring(start2, pos);
                            }
                            else if (!isHexDigit(text.charCodeAt(pos + 1))) {
                                pos++;
                                tokenFlags |= 2048 /* ContainsInvalidEscape */;
                                return text.substring(start2, pos);
                            }
                        }
                        return scanHexadecimalEscape(
                        /*numDigits*/
                        2);
                    case 13 /* carriageReturn */:
                        if (pos < end && text.charCodeAt(pos) === 10 /* lineFeed */) {
                            pos++;
                        }
                    case 10 /* lineFeed */:
                    case 8232 /* lineSeparator */:
                    case 8233 /* paragraphSeparator */:
                        return "";
                    default:
                        return String.fromCharCode(ch);
                }
            }
            function scan() {
                startPos = pos;
                tokenFlags = 0 /* None */;
                let asteriskSeen = false;
                while (true) {
                    tokenPos = pos;
                    if (pos >= end) {
                        return token = 1 /* EndOfFileToken */;
                    }
                    const ch = codePointAt(text, pos);
                    if (ch === 35 /* hash */ && pos === 0 && isShebangTrivia(text, pos)) {
                        pos = scanShebangTrivia(text, pos);
                        if (skipTrivia2) {
                            continue;
                        }
                        else {
                            return token = 6 /* ShebangTrivia */;
                        }
                    }
                    switch (ch) {
                        case 10 /* lineFeed */:
                        case 13 /* carriageReturn */:
                            tokenFlags |= 1 /* PrecedingLineBreak */;
                            if (skipTrivia2) {
                                pos++;
                                continue;
                            }
                            else {
                                if (ch === 13 /* carriageReturn */ && pos + 1 < end && text.charCodeAt(pos + 1) === 10 /* lineFeed */) {
                                    pos += 2;
                                }
                                else {
                                    pos++;
                                }
                                return token = 4 /* NewLineTrivia */;
                            }
                        case 9 /* tab */:
                        case 11 /* verticalTab */:
                        case 12 /* formFeed */:
                        case 32 /* space */:
                        case 160 /* nonBreakingSpace */:
                        case 5760 /* ogham */:
                        case 8192 /* enQuad */:
                        case 8193 /* emQuad */:
                        case 8194 /* enSpace */:
                        case 8195 /* emSpace */:
                        case 8196 /* threePerEmSpace */:
                        case 8197 /* fourPerEmSpace */:
                        case 8198 /* sixPerEmSpace */:
                        case 8199 /* figureSpace */:
                        case 8200 /* punctuationSpace */:
                        case 8201 /* thinSpace */:
                        case 8202 /* hairSpace */:
                        case 8203 /* zeroWidthSpace */:
                        case 8239 /* narrowNoBreakSpace */:
                        case 8287 /* mathematicalSpace */:
                        case 12288 /* ideographicSpace */:
                        case 65279 /* byteOrderMark */:
                            if (skipTrivia2) {
                                pos++;
                                continue;
                            }
                            else {
                                while (pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos))) {
                                    pos++;
                                }
                                return token = 5 /* WhitespaceTrivia */;
                            }
                        case 33 /* exclamation */:
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                    return pos += 3, token = 37 /* ExclamationEqualsEqualsToken */;
                                }
                                return pos += 2, token = 35 /* ExclamationEqualsToken */;
                            }
                            pos++;
                            return token = 53 /* ExclamationToken */;
                        case 34 /* doubleQuote */:
                        case 39 /* singleQuote */:
                            tokenValue = scanString();
                            return token = 10 /* StringLiteral */;
                        case 96 /* backtick */:
                            return token = scanTemplateAndSetTokenValue(
                            /* isTaggedTemplate */
                            false);
                        case 37 /* percent */:
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                return pos += 2, token = 69 /* PercentEqualsToken */;
                            }
                            pos++;
                            return token = 44 /* PercentToken */;
                        case 38 /* ampersand */:
                            if (text.charCodeAt(pos + 1) === 38 /* ampersand */) {
                                if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                    return pos += 3, token = 76 /* AmpersandAmpersandEqualsToken */;
                                }
                                return pos += 2, token = 55 /* AmpersandAmpersandToken */;
                            }
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                return pos += 2, token = 73 /* AmpersandEqualsToken */;
                            }
                            pos++;
                            return token = 50 /* AmpersandToken */;
                        case 40 /* openParen */:
                            pos++;
                            return token = 20 /* OpenParenToken */;
                        case 41 /* closeParen */:
                            pos++;
                            return token = 21 /* CloseParenToken */;
                        case 42 /* asterisk */:
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                return pos += 2, token = 66 /* AsteriskEqualsToken */;
                            }
                            if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
                                if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                    return pos += 3, token = 67 /* AsteriskAsteriskEqualsToken */;
                                }
                                return pos += 2, token = 42 /* AsteriskAsteriskToken */;
                            }
                            pos++;
                            if (inJSDocType && !asteriskSeen && tokenFlags & 1 /* PrecedingLineBreak */) {
                                asteriskSeen = true;
                                continue;
                            }
                            return token = 41 /* AsteriskToken */;
                        case 43 /* plus */:
                            if (text.charCodeAt(pos + 1) === 43 /* plus */) {
                                return pos += 2, token = 45 /* PlusPlusToken */;
                            }
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                return pos += 2, token = 64 /* PlusEqualsToken */;
                            }
                            pos++;
                            return token = 39 /* PlusToken */;
                        case 44 /* comma */:
                            pos++;
                            return token = 27 /* CommaToken */;
                        case 45 /* minus */:
                            if (text.charCodeAt(pos + 1) === 45 /* minus */) {
                                return pos += 2, token = 46 /* MinusMinusToken */;
                            }
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                return pos += 2, token = 65 /* MinusEqualsToken */;
                            }
                            pos++;
                            return token = 40 /* MinusToken */;
                        case 46 /* dot */:
                            if (isDigit(text.charCodeAt(pos + 1))) {
                                tokenValue = scanNumber().value;
                                return token = 8 /* NumericLiteral */;
                            }
                            if (text.charCodeAt(pos + 1) === 46 /* dot */ && text.charCodeAt(pos + 2) === 46 /* dot */) {
                                return pos += 3, token = 25 /* DotDotDotToken */;
                            }
                            pos++;
                            return token = 24 /* DotToken */;
                        case 47 /* slash */:
                            if (text.charCodeAt(pos + 1) === 47 /* slash */) {
                                pos += 2;
                                while (pos < end) {
                                    if (isLineBreak(text.charCodeAt(pos))) {
                                        break;
                                    }
                                    pos++;
                                }
                                commentDirectives = appendIfCommentDirective(commentDirectives, text.slice(tokenPos, pos), commentDirectiveRegExSingleLine, tokenPos);
                                if (skipTrivia2) {
                                    continue;
                                }
                                else {
                                    return token = 2 /* SingleLineCommentTrivia */;
                                }
                            }
                            if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
                                pos += 2;
                                if (text.charCodeAt(pos) === 42 /* asterisk */ && text.charCodeAt(pos + 1) !== 47 /* slash */) {
                                    tokenFlags |= 2 /* PrecedingJSDocComment */;
                                }
                                let commentClosed = false;
                                let lastLineStart = tokenPos;
                                while (pos < end) {
                                    const ch2 = text.charCodeAt(pos);
                                    if (ch2 === 42 /* asterisk */ && text.charCodeAt(pos + 1) === 47 /* slash */) {
                                        pos += 2;
                                        commentClosed = true;
                                        break;
                                    }
                                    pos++;
                                    if (isLineBreak(ch2)) {
                                        lastLineStart = pos;
                                        tokenFlags |= 1 /* PrecedingLineBreak */;
                                    }
                                }
                                commentDirectives = appendIfCommentDirective(commentDirectives, text.slice(lastLineStart, pos), commentDirectiveRegExMultiLine, lastLineStart);
                                if (!commentClosed) {
                                    error(Diagnostics.Asterisk_Slash_expected);
                                }
                                if (skipTrivia2) {
                                    continue;
                                }
                                else {
                                    if (!commentClosed) {
                                        tokenFlags |= 4 /* Unterminated */;
                                    }
                                    return token = 3 /* MultiLineCommentTrivia */;
                                }
                            }
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                return pos += 2, token = 68 /* SlashEqualsToken */;
                            }
                            pos++;
                            return token = 43 /* SlashToken */;
                        case 48 /* _0 */:
                            if (pos + 2 < end && (text.charCodeAt(pos + 1) === 88 /* X */ || text.charCodeAt(pos + 1) === 120 /* x */)) {
                                pos += 2;
                                tokenValue = scanMinimumNumberOfHexDigits(1, 
                                /*canHaveSeparators*/
                                true);
                                if (!tokenValue) {
                                    error(Diagnostics.Hexadecimal_digit_expected);
                                    tokenValue = "0";
                                }
                                tokenValue = "0x" + tokenValue;
                                tokenFlags |= 64 /* HexSpecifier */;
                                return token = checkBigIntSuffix();
                            }
                            else if (pos + 2 < end && (text.charCodeAt(pos + 1) === 66 /* B */ || text.charCodeAt(pos + 1) === 98 /* b */)) {
                                pos += 2;
                                tokenValue = scanBinaryOrOctalDigits(
                                /* base */
                                2);
                                if (!tokenValue) {
                                    error(Diagnostics.Binary_digit_expected);
                                    tokenValue = "0";
                                }
                                tokenValue = "0b" + tokenValue;
                                tokenFlags |= 128 /* BinarySpecifier */;
                                return token = checkBigIntSuffix();
                            }
                            else if (pos + 2 < end && (text.charCodeAt(pos + 1) === 79 /* O */ || text.charCodeAt(pos + 1) === 111 /* o */)) {
                                pos += 2;
                                tokenValue = scanBinaryOrOctalDigits(
                                /* base */
                                8);
                                if (!tokenValue) {
                                    error(Diagnostics.Octal_digit_expected);
                                    tokenValue = "0";
                                }
                                tokenValue = "0o" + tokenValue;
                                tokenFlags |= 256 /* OctalSpecifier */;
                                return token = checkBigIntSuffix();
                            }
                            if (pos + 1 < end && isOctalDigit(text.charCodeAt(pos + 1))) {
                                tokenValue = "" + scanOctalDigits();
                                tokenFlags |= 32 /* Octal */;
                                return token = 8 /* NumericLiteral */;
                            }
                        case 49 /* _1 */:
                        case 50 /* _2 */:
                        case 51 /* _3 */:
                        case 52 /* _4 */:
                        case 53 /* _5 */:
                        case 54 /* _6 */:
                        case 55 /* _7 */:
                        case 56 /* _8 */:
                        case 57 /* _9 */:
                            ({ type: token, value: tokenValue } = scanNumber());
                            return token;
                        case 58 /* colon */:
                            pos++;
                            return token = 58 /* ColonToken */;
                        case 59 /* semicolon */:
                            pos++;
                            return token = 26 /* SemicolonToken */;
                        case 60 /* lessThan */:
                            if (isConflictMarkerTrivia(text, pos)) {
                                pos = scanConflictMarkerTrivia(text, pos, error);
                                if (skipTrivia2) {
                                    continue;
                                }
                                else {
                                    return token = 7 /* ConflictMarkerTrivia */;
                                }
                            }
                            if (text.charCodeAt(pos + 1) === 60 /* lessThan */) {
                                if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                    return pos += 3, token = 70 /* LessThanLessThanEqualsToken */;
                                }
                                return pos += 2, token = 47 /* LessThanLessThanToken */;
                            }
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                return pos += 2, token = 32 /* LessThanEqualsToken */;
                            }
                            if (languageVariant === 1 /* JSX */ && text.charCodeAt(pos + 1) === 47 /* slash */ && text.charCodeAt(pos + 2) !== 42 /* asterisk */) {
                                return pos += 2, token = 30 /* LessThanSlashToken */;
                            }
                            pos++;
                            return token = 29 /* LessThanToken */;
                        case 61 /* equals */:
                            if (isConflictMarkerTrivia(text, pos)) {
                                pos = scanConflictMarkerTrivia(text, pos, error);
                                if (skipTrivia2) {
                                    continue;
                                }
                                else {
                                    return token = 7 /* ConflictMarkerTrivia */;
                                }
                            }
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                    return pos += 3, token = 36 /* EqualsEqualsEqualsToken */;
                                }
                                return pos += 2, token = 34 /* EqualsEqualsToken */;
                            }
                            if (text.charCodeAt(pos + 1) === 62 /* greaterThan */) {
                                return pos += 2, token = 38 /* EqualsGreaterThanToken */;
                            }
                            pos++;
                            return token = 63 /* EqualsToken */;
                        case 62 /* greaterThan */:
                            if (isConflictMarkerTrivia(text, pos)) {
                                pos = scanConflictMarkerTrivia(text, pos, error);
                                if (skipTrivia2) {
                                    continue;
                                }
                                else {
                                    return token = 7 /* ConflictMarkerTrivia */;
                                }
                            }
                            pos++;
                            return token = 31 /* GreaterThanToken */;
                        case 63 /* question */:
                            if (text.charCodeAt(pos + 1) === 46 /* dot */ && !isDigit(text.charCodeAt(pos + 2))) {
                                return pos += 2, token = 28 /* QuestionDotToken */;
                            }
                            if (text.charCodeAt(pos + 1) === 63 /* question */) {
                                if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                    return pos += 3, token = 77 /* QuestionQuestionEqualsToken */;
                                }
                                return pos += 2, token = 60 /* QuestionQuestionToken */;
                            }
                            pos++;
                            return token = 57 /* QuestionToken */;
                        case 91 /* openBracket */:
                            pos++;
                            return token = 22 /* OpenBracketToken */;
                        case 93 /* closeBracket */:
                            pos++;
                            return token = 23 /* CloseBracketToken */;
                        case 94 /* caret */:
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                return pos += 2, token = 78 /* CaretEqualsToken */;
                            }
                            pos++;
                            return token = 52 /* CaretToken */;
                        case 123 /* openBrace */:
                            pos++;
                            return token = 18 /* OpenBraceToken */;
                        case 124 /* bar */:
                            if (isConflictMarkerTrivia(text, pos)) {
                                pos = scanConflictMarkerTrivia(text, pos, error);
                                if (skipTrivia2) {
                                    continue;
                                }
                                else {
                                    return token = 7 /* ConflictMarkerTrivia */;
                                }
                            }
                            if (text.charCodeAt(pos + 1) === 124 /* bar */) {
                                if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                    return pos += 3, token = 75 /* BarBarEqualsToken */;
                                }
                                return pos += 2, token = 56 /* BarBarToken */;
                            }
                            if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                                return pos += 2, token = 74 /* BarEqualsToken */;
                            }
                            pos++;
                            return token = 51 /* BarToken */;
                        case 125 /* closeBrace */:
                            pos++;
                            return token = 19 /* CloseBraceToken */;
                        case 126 /* tilde */:
                            pos++;
                            return token = 54 /* TildeToken */;
                        case 64 /* at */:
                            pos++;
                            return token = 59 /* AtToken */;
                        case 92 /* backslash */:
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
                            error(Diagnostics.Invalid_character);
                            pos++;
                            return token = 0 /* Unknown */;
                        case 35 /* hash */:
                            if (pos !== 0 && text[pos + 1] === "!") {
                                error(Diagnostics.can_only_be_used_at_the_start_of_a_file);
                                pos++;
                                return token = 0 /* Unknown */;
                            }
                            const charAfterHash = codePointAt(text, pos + 1);
                            if (charAfterHash === 92 /* backslash */) {
                                pos++;
                                const extendedCookedChar2 = peekExtendedUnicodeEscape();
                                if (extendedCookedChar2 >= 0 && isIdentifierStart(extendedCookedChar2, languageVersion)) {
                                    pos += 3;
                                    tokenFlags |= 8 /* ExtendedUnicodeEscape */;
                                    tokenValue = "#" + scanExtendedUnicodeEscape() + scanIdentifierParts();
                                    return token = 80 /* PrivateIdentifier */;
                                }
                                const cookedChar2 = peekUnicodeEscape();
                                if (cookedChar2 >= 0 && isIdentifierStart(cookedChar2, languageVersion)) {
                                    pos += 6;
                                    tokenFlags |= 1024 /* UnicodeEscape */;
                                    tokenValue = "#" + String.fromCharCode(cookedChar2) + scanIdentifierParts();
                                    return token = 80 /* PrivateIdentifier */;
                                }
                                pos--;
                            }
                            if (isIdentifierStart(charAfterHash, languageVersion)) {
                                pos++;
                                scanIdentifier(charAfterHash, languageVersion);
                            }
                            else {
                                tokenValue = "#";
                                error(Diagnostics.Invalid_character, pos++, charSize(ch));
                            }
                            return token = 80 /* PrivateIdentifier */;
                        default:
                            const identifierKind = scanIdentifier(ch, languageVersion);
                            if (identifierKind) {
                                return token = identifierKind;
                            }
                            else if (isWhiteSpaceSingleLine(ch)) {
                                pos += charSize(ch);
                                continue;
                            }
                            else if (isLineBreak(ch)) {
                                tokenFlags |= 1 /* PrecedingLineBreak */;
                                pos += charSize(ch);
                                continue;
                            }
                            const size = charSize(ch);
                            error(Diagnostics.Invalid_character, pos, size);
                            pos += size;
                            return token = 0 /* Unknown */;
                    }
                }
            }
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