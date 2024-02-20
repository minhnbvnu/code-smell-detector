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