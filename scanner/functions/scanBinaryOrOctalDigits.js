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