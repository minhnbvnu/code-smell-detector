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