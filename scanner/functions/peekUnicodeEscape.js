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