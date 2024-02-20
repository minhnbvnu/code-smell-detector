function couldStartTrivia(text, pos) {
            const ch = text.charCodeAt(pos);
            switch (ch) {
                case 13 /* carriageReturn */:
                case 10 /* lineFeed */:
                case 9 /* tab */:
                case 11 /* verticalTab */:
                case 12 /* formFeed */:
                case 32 /* space */:
                case 47 /* slash */:
                case 60 /* lessThan */:
                case 124 /* bar */:
                case 61 /* equals */:
                case 62 /* greaterThan */:
                    return true;
                case 35 /* hash */:
                    return pos === 0;
                default:
                    return ch > 127 /* maxAsciiCharacter */;
            }
        }