function createScanner(languageVersion, skipTrivia2, languageVariant = 0 /* Standard */, textInitial, onError, start, length2) {
            var text = textInitial;
            var pos;
            var end;
            var startPos;
            var tokenPos;
            var token;
            var tokenValue;
            var tokenFlags;
            var commentDirectives;
            var inJSDocType = 0;
            setText(text, start, length2);
            var scanner2 = {
                getStartPos: () => startPos,
                getTextPos: () => pos,
                getToken: () => token,
                getTokenPos: () => tokenPos,
                getTokenText: () => text.substring(tokenPos, pos),
                getTokenValue: () => tokenValue,
                hasUnicodeEscape: () => (tokenFlags & 1024 /* UnicodeEscape */) !== 0,
                hasExtendedUnicodeEscape: () => (tokenFlags & 8 /* ExtendedUnicodeEscape */) !== 0,
                hasPrecedingLineBreak: () => (tokenFlags & 1 /* PrecedingLineBreak */) !== 0,
                hasPrecedingJSDocComment: () => (tokenFlags & 2 /* PrecedingJSDocComment */) !== 0,
                isIdentifier: () => token === 79 /* Identifier */ || token > 116 /* LastReservedWord */,
                isReservedWord: () => token >= 81 /* FirstReservedWord */ && token <= 116 /* LastReservedWord */,
                isUnterminated: () => (tokenFlags & 4 /* Unterminated */) !== 0,
                getCommentDirectives: () => commentDirectives,
                getNumericLiteralFlags: () => tokenFlags & 1008 /* NumericLiteralFlags */,
                getTokenFlags: () => tokenFlags,
                reScanGreaterToken,
                reScanAsteriskEqualsToken,
                reScanSlashToken,
                reScanTemplateToken,
                reScanTemplateHeadOrNoSubstitutionTemplate,
                scanJsxIdentifier,
                scanJsxAttributeValue,
                reScanJsxAttributeValue,
                reScanJsxToken,
                reScanLessThanToken,
                reScanHashToken,
                reScanQuestionToken,
                reScanInvalidIdentifier,
                scanJsxToken,
                scanJsDocToken,
                scan,
                getText,
                clearCommentDirectives,
                setText,
                setScriptTarget,
                setLanguageVariant,
                setOnError,
                setTextPos,
                setInJSDocType,
                tryScan,
                lookAhead,
                scanRange
            };
            if (Debug.isDebugging) {
                Object.defineProperty(scanner2, "__debugShowCurrentPositionInText", {
                    get: () => {
                        const text2 = scanner2.getText();
                        return text2.slice(0, scanner2.getStartPos()) + "\u2551" + text2.slice(scanner2.getStartPos());
                    }
                });
            }
            return scanner2;
            function error(message, errPos = pos, length3) {
                if (onError) {
                    const oldPos = pos;
                    pos = errPos;
                    onError(message, length3 || 0);
                    pos = oldPos;
                }
            }
            function scanNumberFragment() {
                let start2 = pos;
                let allowSeparator = false;
                let isPreviousTokenSeparator = false;
                let result = "";
                while (true) {
                    const ch = text.charCodeAt(pos);
                    if (ch === 95 /* _ */) {
                        tokenFlags |= 512 /* ContainsSeparator */;
                        if (allowSeparator) {
                            allowSeparator = false;
                            isPreviousTokenSeparator = true;
                            result += text.substring(start2, pos);
                        }
                        else if (isPreviousTokenSeparator) {
                            error(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
                        }
                        else {
                            error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                        }
                        pos++;
                        start2 = pos;
                        continue;
                    }
                    if (isDigit(ch)) {
                        allowSeparator = true;
                        isPreviousTokenSeparator = false;
                        pos++;
                        continue;
                    }
                    break;
                }
                if (text.charCodeAt(pos - 1) === 95 /* _ */) {
                    error(Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
                }
                return result + text.substring(start2, pos);
            }
            function scanNumber() {
                const start2 = pos;
                const mainFragment = scanNumberFragment();
                let decimalFragment;
                let scientificFragment;
                if (text.charCodeAt(pos) === 46 /* dot */) {
                    pos++;
                    decimalFragment = scanNumberFragment();
                }
                let end2 = pos;
                if (text.charCodeAt(pos) === 69 /* E */ || text.charCodeAt(pos) === 101 /* e */) {
                    pos++;
                    tokenFlags |= 16 /* Scientific */;
                    if (text.charCodeAt(pos) === 43 /* plus */ || text.charCodeAt(pos) === 45 /* minus */)
                        pos++;
                    const preNumericPart = pos;
                    const finalFragment = scanNumberFragment();
                    if (!finalFragment) {
                        error(Diagnostics.Digit_expected);
                    }
                    else {
                        scientificFragment = text.substring(end2, preNumericPart) + finalFragment;
                        end2 = pos;
                    }
                }
                let result;
                if (tokenFlags & 512 /* ContainsSeparator */) {
                    result = mainFragment;
                    if (decimalFragment) {
                        result += "." + decimalFragment;
                    }
                    if (scientificFragment) {
                        result += scientificFragment;
                    }
                }
                else {
                    result = text.substring(start2, end2);
                }
                if (decimalFragment !== void 0 || tokenFlags & 16 /* Scientific */) {
                    checkForIdentifierStartAfterNumericLiteral(start2, decimalFragment === void 0 && !!(tokenFlags & 16 /* Scientific */));
                    return {
                        type: 8 /* NumericLiteral */,
                        value: "" + +result
                        // if value is not an integer, it can be safely coerced to a number
                    };
                }
                else {
                    tokenValue = result;
                    const type = checkBigIntSuffix();
                    checkForIdentifierStartAfterNumericLiteral(start2);
                    return { type, value: tokenValue };
                }
            }
            function checkForIdentifierStartAfterNumericLiteral(numericStart, isScientific) {
                if (!isIdentifierStart(codePointAt(text, pos), languageVersion)) {
                    return;
                }
                const identifierStart = pos;
                const { length: length3 } = scanIdentifierParts();
                if (length3 === 1 && text[identifierStart] === "n") {
                    if (isScientific) {
                        error(Diagnostics.A_bigint_literal_cannot_use_exponential_notation, numericStart, identifierStart - numericStart + 1);
                    }
                    else {
                        error(Diagnostics.A_bigint_literal_must_be_an_integer, numericStart, identifierStart - numericStart + 1);
                    }
                }
                else {
                    error(Diagnostics.An_identifier_or_keyword_cannot_immediately_follow_a_numeric_literal, identifierStart, length3);
                    pos = identifierStart;
                }
            }
            function scanOctalDigits() {
                const start2 = pos;
                while (isOctalDigit(text.charCodeAt(pos))) {
                    pos++;
                }
                return +text.substring(start2, pos);
            }
            function scanExactNumberOfHexDigits(count, canHaveSeparators) {
                const valueString = scanHexDigits(
                /*minCount*/
                count, 
                /*scanAsManyAsPossible*/
                false, canHaveSeparators);
                return valueString ? parseInt(valueString, 16) : -1;
            }
            function scanMinimumNumberOfHexDigits(count, canHaveSeparators) {
                return scanHexDigits(
                /*minCount*/
                count, 
                /*scanAsManyAsPossible*/
                true, canHaveSeparators);
            }
            function scanHexDigits(minCount, scanAsManyAsPossible, canHaveSeparators) {
                let valueChars = [];
                let allowSeparator = false;
                let isPreviousTokenSeparator = false;
                while (valueChars.length < minCount || scanAsManyAsPossible) {
                    let ch = text.charCodeAt(pos);
                    if (canHaveSeparators && ch === 95 /* _ */) {
                        tokenFlags |= 512 /* ContainsSeparator */;
                        if (allowSeparator) {
                            allowSeparator = false;
                            isPreviousTokenSeparator = true;
                        }
                        else if (isPreviousTokenSeparator) {
                            error(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
                        }
                        else {
                            error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                        }
                        pos++;
                        continue;
                    }
                    allowSeparator = canHaveSeparators;
                    if (ch >= 65 /* A */ && ch <= 70 /* F */) {
                        ch += 97 /* a */ - 65 /* A */;
                    }
                    else if (!(ch >= 48 /* _0 */ && ch <= 57 /* _9 */ || ch >= 97 /* a */ && ch <= 102 /* f */)) {
                        break;
                    }
                    valueChars.push(ch);
                    pos++;
                    isPreviousTokenSeparator = false;
                }
                if (valueChars.length < minCount) {
                    valueChars = [];
                }
                if (text.charCodeAt(pos - 1) === 95 /* _ */) {
                    error(Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
                }
                return String.fromCharCode(...valueChars);
            }
            function scanString(jsxAttributeString = false) {
                const quote2 = text.charCodeAt(pos);
                pos++;
                let result = "";
                let start2 = pos;
                while (true) {
                    if (pos >= end) {
                        result += text.substring(start2, pos);
                        tokenFlags |= 4 /* Unterminated */;
                        error(Diagnostics.Unterminated_string_literal);
                        break;
                    }
                    const ch = text.charCodeAt(pos);
                    if (ch === quote2) {
                        result += text.substring(start2, pos);
                        pos++;
                        break;
                    }
                    if (ch === 92 /* backslash */ && !jsxAttributeString) {
                        result += text.substring(start2, pos);
                        result += scanEscapeSequence();
                        start2 = pos;
                        continue;
                    }
                    if (isLineBreak(ch) && !jsxAttributeString) {
                        result += text.substring(start2, pos);
                        tokenFlags |= 4 /* Unterminated */;
                        error(Diagnostics.Unterminated_string_literal);
                        break;
                    }
                    pos++;
                }
                return result;
            }
            function scanTemplateAndSetTokenValue(isTaggedTemplate) {
                const startedWithBacktick = text.charCodeAt(pos) === 96 /* backtick */;
                pos++;
                let start2 = pos;
                let contents = "";
                let resultingToken;
                while (true) {
                    if (pos >= end) {
                        contents += text.substring(start2, pos);
                        tokenFlags |= 4 /* Unterminated */;
                        error(Diagnostics.Unterminated_template_literal);
                        resultingToken = startedWithBacktick ? 14 /* NoSubstitutionTemplateLiteral */ : 17 /* TemplateTail */;
                        break;
                    }
                    const currChar = text.charCodeAt(pos);
                    if (currChar === 96 /* backtick */) {
                        contents += text.substring(start2, pos);
                        pos++;
                        resultingToken = startedWithBacktick ? 14 /* NoSubstitutionTemplateLiteral */ : 17 /* TemplateTail */;
                        break;
                    }
                    if (currChar === 36 /* $ */ && pos + 1 < end && text.charCodeAt(pos + 1) === 123 /* openBrace */) {
                        contents += text.substring(start2, pos);
                        pos += 2;
                        resultingToken = startedWithBacktick ? 15 /* TemplateHead */ : 16 /* TemplateMiddle */;
                        break;
                    }
                    if (currChar === 92 /* backslash */) {
                        contents += text.substring(start2, pos);
                        contents += scanEscapeSequence(isTaggedTemplate);
                        start2 = pos;
                        continue;
                    }
                    if (currChar === 13 /* carriageReturn */) {
                        contents += text.substring(start2, pos);
                        pos++;
                        if (pos < end && text.charCodeAt(pos) === 10 /* lineFeed */) {
                            pos++;
                        }
                        contents += "\n";
                        start2 = pos;
                        continue;
                    }
                    pos++;
                }
                Debug.assert(resultingToken !== void 0);
                tokenValue = contents;
                return resultingToken;
            }
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
            function scanHexadecimalEscape(numDigits) {
                const escapedValue = scanExactNumberOfHexDigits(numDigits, 
                /*canHaveSeparators*/
                false);
                if (escapedValue >= 0) {
                    return String.fromCharCode(escapedValue);
                }
                else {
                    error(Diagnostics.Hexadecimal_digit_expected);
                    return "";
                }
            }
            function scanExtendedUnicodeEscape() {
                const escapedValueString = scanMinimumNumberOfHexDigits(1, 
                /*canHaveSeparators*/
                false);
                const escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
                let isInvalidExtendedEscape = false;
                if (escapedValue < 0) {
                    error(Diagnostics.Hexadecimal_digit_expected);
                    isInvalidExtendedEscape = true;
                }
                else if (escapedValue > 1114111) {
                    error(Diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive);
                    isInvalidExtendedEscape = true;
                }
                if (pos >= end) {
                    error(Diagnostics.Unexpected_end_of_text);
                    isInvalidExtendedEscape = true;
                }
                else if (text.charCodeAt(pos) === 125 /* closeBrace */) {
                    pos++;
                }
                else {
                    error(Diagnostics.Unterminated_Unicode_escape_sequence);
                    isInvalidExtendedEscape = true;
                }
                if (isInvalidExtendedEscape) {
                    return "";
                }
                return utf16EncodeAsString(escapedValue);
            }
            function peekUnicodeEscape() {
                if (pos + 5 < end && text.charCodeAt(pos + 1) === 117 /* u */) {
                    const start2 = pos;
                    pos += 2;
                    const value = scanExactNumberOfHexDigits(4, 
                    /*canHaveSeparators*/
                    false);
                    pos = start2;
                    return value;
                }
                return -1;
            }
            function peekExtendedUnicodeEscape() {
                if (codePointAt(text, pos + 1) === 117 /* u */ && codePointAt(text, pos + 2) === 123 /* openBrace */) {
                    const start2 = pos;
                    pos += 3;
                    const escapedValueString = scanMinimumNumberOfHexDigits(1, 
                    /*canHaveSeparators*/
                    false);
                    const escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
                    pos = start2;
                    return escapedValue;
                }
                return -1;
            }
            function scanIdentifierParts() {
                let result = "";
                let start2 = pos;
                while (pos < end) {
                    let ch = codePointAt(text, pos);
                    if (isIdentifierPart(ch, languageVersion)) {
                        pos += charSize(ch);
                    }
                    else if (ch === 92 /* backslash */) {
                        ch = peekExtendedUnicodeEscape();
                        if (ch >= 0 && isIdentifierPart(ch, languageVersion)) {
                            pos += 3;
                            tokenFlags |= 8 /* ExtendedUnicodeEscape */;
                            result += scanExtendedUnicodeEscape();
                            start2 = pos;
                            continue;
                        }
                        ch = peekUnicodeEscape();
                        if (!(ch >= 0 && isIdentifierPart(ch, languageVersion))) {
                            break;
                        }
                        tokenFlags |= 1024 /* UnicodeEscape */;
                        result += text.substring(start2, pos);
                        result += utf16EncodeAsString(ch);
                        pos += 6;
                        start2 = pos;
                    }
                    else {
                        break;
                    }
                }
                result += text.substring(start2, pos);
                return result;
            }
            function getIdentifierToken() {
                const len = tokenValue.length;
                if (len >= 2 && len <= 12) {
                    const ch = tokenValue.charCodeAt(0);
                    if (ch >= 97 /* a */ && ch <= 122 /* z */) {
                        const keyword = textToKeyword.get(tokenValue);
                        if (keyword !== void 0) {
                            return token = keyword;
                        }
                    }
                }
                return token = 79 /* Identifier */;
            }
            function scanBinaryOrOctalDigits(base) {
                let value = "";
                let separatorAllowed = false;
                let isPreviousTokenSeparator = false;
                while (true) {
                    const ch = text.charCodeAt(pos);
                    if (ch === 95 /* _ */) {
                        tokenFlags |= 512 /* ContainsSeparator */;
                        if (separatorAllowed) {
                            separatorAllowed = false;
                            isPreviousTokenSeparator = true;
                        }
                        else if (isPreviousTokenSeparator) {
                            error(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
                        }
                        else {
                            error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                        }
                        pos++;
                        continue;
                    }
                    separatorAllowed = true;
                    if (!isDigit(ch) || ch - 48 /* _0 */ >= base) {
                        break;
                    }
                    value += text[pos];
                    pos++;
                    isPreviousTokenSeparator = false;
                }
                if (text.charCodeAt(pos - 1) === 95 /* _ */) {
                    error(Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
                }
                return value;
            }
            function checkBigIntSuffix() {
                if (text.charCodeAt(pos) === 110 /* n */) {
                    tokenValue += "n";
                    if (tokenFlags & 384 /* BinaryOrOctalSpecifier */) {
                        tokenValue = parsePseudoBigInt(tokenValue) + "n";
                    }
                    pos++;
                    return 9 /* BigIntLiteral */;
                }
                else {
                    const numericValue = tokenFlags & 128 /* BinarySpecifier */ ? parseInt(tokenValue.slice(2), 2) : tokenFlags & 256 /* OctalSpecifier */ ? parseInt(tokenValue.slice(2), 8) : +tokenValue;
                    tokenValue = "" + numericValue;
                    return 8 /* NumericLiteral */;
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
            function scanIdentifier(startCharacter, languageVersion2) {
                let ch = startCharacter;
                if (isIdentifierStart(ch, languageVersion2)) {
                    pos += charSize(ch);
                    while (pos < end && isIdentifierPart(ch = codePointAt(text, pos), languageVersion2))
                        pos += charSize(ch);
                    tokenValue = text.substring(tokenPos, pos);
                    if (ch === 92 /* backslash */) {
                        tokenValue += scanIdentifierParts();
                    }
                    return getIdentifierToken();
                }
            }
            function reScanGreaterToken() {
                if (token === 31 /* GreaterThanToken */) {
                    if (text.charCodeAt(pos) === 62 /* greaterThan */) {
                        if (text.charCodeAt(pos + 1) === 62 /* greaterThan */) {
                            if (text.charCodeAt(pos + 2) === 61 /* equals */) {
                                return pos += 3, token = 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */;
                            }
                            return pos += 2, token = 49 /* GreaterThanGreaterThanGreaterThanToken */;
                        }
                        if (text.charCodeAt(pos + 1) === 61 /* equals */) {
                            return pos += 2, token = 71 /* GreaterThanGreaterThanEqualsToken */;
                        }
                        pos++;
                        return token = 48 /* GreaterThanGreaterThanToken */;
                    }
                    if (text.charCodeAt(pos) === 61 /* equals */) {
                        pos++;
                        return token = 33 /* GreaterThanEqualsToken */;
                    }
                }
                return token;
            }
            function reScanAsteriskEqualsToken() {
                Debug.assert(token === 66 /* AsteriskEqualsToken */, "'reScanAsteriskEqualsToken' should only be called on a '*='");
                pos = tokenPos + 1;
                return token = 63 /* EqualsToken */;
            }
            function reScanSlashToken() {
                if (token === 43 /* SlashToken */ || token === 68 /* SlashEqualsToken */) {
                    let p = tokenPos + 1;
                    let inEscape = false;
                    let inCharacterClass = false;
                    while (true) {
                        if (p >= end) {
                            tokenFlags |= 4 /* Unterminated */;
                            error(Diagnostics.Unterminated_regular_expression_literal);
                            break;
                        }
                        const ch = text.charCodeAt(p);
                        if (isLineBreak(ch)) {
                            tokenFlags |= 4 /* Unterminated */;
                            error(Diagnostics.Unterminated_regular_expression_literal);
                            break;
                        }
                        if (inEscape) {
                            inEscape = false;
                        }
                        else if (ch === 47 /* slash */ && !inCharacterClass) {
                            p++;
                            break;
                        }
                        else if (ch === 91 /* openBracket */) {
                            inCharacterClass = true;
                        }
                        else if (ch === 92 /* backslash */) {
                            inEscape = true;
                        }
                        else if (ch === 93 /* closeBracket */) {
                            inCharacterClass = false;
                        }
                        p++;
                    }
                    while (p < end && isIdentifierPart(text.charCodeAt(p), languageVersion)) {
                        p++;
                    }
                    pos = p;
                    tokenValue = text.substring(tokenPos, pos);
                    token = 13 /* RegularExpressionLiteral */;
                }
                return token;
            }
            function appendIfCommentDirective(commentDirectives2, text2, commentDirectiveRegEx, lineStart) {
                const type = getDirectiveFromComment(trimStringStart(text2), commentDirectiveRegEx);
                if (type === void 0) {
                    return commentDirectives2;
                }
                return append(commentDirectives2, {
                    range: { pos: lineStart, end: pos },
                    type
                });
            }
            function getDirectiveFromComment(text2, commentDirectiveRegEx) {
                const match = commentDirectiveRegEx.exec(text2);
                if (!match) {
                    return void 0;
                }
                switch (match[1]) {
                    case "ts-expect-error":
                        return 0 /* ExpectError */;
                    case "ts-ignore":
                        return 1 /* Ignore */;
                }
                return void 0;
            }
            function reScanTemplateToken(isTaggedTemplate) {
                Debug.assert(token === 19 /* CloseBraceToken */, "'reScanTemplateToken' should only be called on a '}'");
                pos = tokenPos;
                return token = scanTemplateAndSetTokenValue(isTaggedTemplate);
            }
            function reScanTemplateHeadOrNoSubstitutionTemplate() {
                pos = tokenPos;
                return token = scanTemplateAndSetTokenValue(
                /* isTaggedTemplate */
                true);
            }
            function reScanJsxToken(allowMultilineJsxText = true) {
                pos = tokenPos = startPos;
                return token = scanJsxToken(allowMultilineJsxText);
            }
            function reScanLessThanToken() {
                if (token === 47 /* LessThanLessThanToken */) {
                    pos = tokenPos + 1;
                    return token = 29 /* LessThanToken */;
                }
                return token;
            }
            function reScanHashToken() {
                if (token === 80 /* PrivateIdentifier */) {
                    pos = tokenPos + 1;
                    return token = 62 /* HashToken */;
                }
                return token;
            }
            function reScanQuestionToken() {
                Debug.assert(token === 60 /* QuestionQuestionToken */, "'reScanQuestionToken' should only be called on a '??'");
                pos = tokenPos + 1;
                return token = 57 /* QuestionToken */;
            }
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
            function scanJsxIdentifier() {
                if (tokenIsIdentifierOrKeyword(token)) {
                    let namespaceSeparator = false;
                    while (pos < end) {
                        const ch = text.charCodeAt(pos);
                        if (ch === 45 /* minus */) {
                            tokenValue += "-";
                            pos++;
                            continue;
                        }
                        else if (ch === 58 /* colon */ && !namespaceSeparator) {
                            tokenValue += ":";
                            pos++;
                            namespaceSeparator = true;
                            token = 79 /* Identifier */;
                            continue;
                        }
                        const oldPos = pos;
                        tokenValue += scanIdentifierParts();
                        if (pos === oldPos) {
                            break;
                        }
                    }
                    if (tokenValue.slice(-1) === ":") {
                        tokenValue = tokenValue.slice(0, -1);
                        pos--;
                    }
                    return getIdentifierToken();
                }
                return token;
            }
            function scanJsxAttributeValue() {
                startPos = pos;
                switch (text.charCodeAt(pos)) {
                    case 34 /* doubleQuote */:
                    case 39 /* singleQuote */:
                        tokenValue = scanString(
                        /*jsxAttributeString*/
                        true);
                        return token = 10 /* StringLiteral */;
                    default:
                        return scan();
                }
            }
            function reScanJsxAttributeValue() {
                pos = tokenPos = startPos;
                return scanJsxAttributeValue();
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
            function speculationHelper(callback, isLookahead) {
                const savePos = pos;
                const saveStartPos = startPos;
                const saveTokenPos = tokenPos;
                const saveToken = token;
                const saveTokenValue = tokenValue;
                const saveTokenFlags = tokenFlags;
                const result = callback();
                if (!result || isLookahead) {
                    pos = savePos;
                    startPos = saveStartPos;
                    tokenPos = saveTokenPos;
                    token = saveToken;
                    tokenValue = saveTokenValue;
                    tokenFlags = saveTokenFlags;
                }
                return result;
            }
            function scanRange(start2, length3, callback) {
                const saveEnd = end;
                const savePos = pos;
                const saveStartPos = startPos;
                const saveTokenPos = tokenPos;
                const saveToken = token;
                const saveTokenValue = tokenValue;
                const saveTokenFlags = tokenFlags;
                const saveErrorExpectations = commentDirectives;
                setText(text, start2, length3);
                const result = callback();
                end = saveEnd;
                pos = savePos;
                startPos = saveStartPos;
                tokenPos = saveTokenPos;
                token = saveToken;
                tokenValue = saveTokenValue;
                tokenFlags = saveTokenFlags;
                commentDirectives = saveErrorExpectations;
                return result;
            }
            function lookAhead(callback) {
                return speculationHelper(callback, 
                /*isLookahead*/
                true);
            }
            function tryScan(callback) {
                return speculationHelper(callback, 
                /*isLookahead*/
                false);
            }
            function getText() {
                return text;
            }
            function clearCommentDirectives() {
                commentDirectives = void 0;
            }
            function setText(newText, start2, length3) {
                text = newText || "";
                end = length3 === void 0 ? text.length : start2 + length3;
                setTextPos(start2 || 0);
            }
            function setOnError(errorCallback) {
                onError = errorCallback;
            }
            function setScriptTarget(scriptTarget) {
                languageVersion = scriptTarget;
            }
            function setLanguageVariant(variant) {
                languageVariant = variant;
            }
            function setTextPos(textPos) {
                Debug.assert(textPos >= 0);
                pos = textPos;
                startPos = textPos;
                tokenPos = textPos;
                token = 0 /* Unknown */;
                tokenValue = void 0;
                tokenFlags = 0 /* None */;
            }
            function setInJSDocType(inType) {
                inJSDocType += inType ? 1 : -1;
            }
        }