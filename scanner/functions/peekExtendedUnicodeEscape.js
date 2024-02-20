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