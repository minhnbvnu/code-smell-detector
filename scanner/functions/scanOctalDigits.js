function scanOctalDigits() {
                const start2 = pos;
                while (isOctalDigit(text.charCodeAt(pos))) {
                    pos++;
                }
                return +text.substring(start2, pos);
            }