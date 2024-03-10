function charIsPunctuation(ch) {
            switch (ch) {
                case 33 /* exclamation */:
                case 34 /* doubleQuote */:
                case 35 /* hash */:
                case 37 /* percent */:
                case 38 /* ampersand */:
                case 39 /* singleQuote */:
                case 40 /* openParen */:
                case 41 /* closeParen */:
                case 42 /* asterisk */:
                case 44 /* comma */:
                case 45 /* minus */:
                case 46 /* dot */:
                case 47 /* slash */:
                case 58 /* colon */:
                case 59 /* semicolon */:
                case 63 /* question */:
                case 64 /* at */:
                case 91 /* openBracket */:
                case 92 /* backslash */:
                case 93 /* closeBracket */:
                case 95 /* _ */:
                case 123 /* openBrace */:
                case 125 /* closeBrace */:
                    return true;
            }
            return false;
        }