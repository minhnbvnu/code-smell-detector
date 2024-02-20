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