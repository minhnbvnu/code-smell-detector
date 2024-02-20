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