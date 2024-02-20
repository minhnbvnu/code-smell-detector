function isAllPunctuation(identifier, start, end) {
            return every2(identifier, (ch) => charIsPunctuation(ch) && ch !== 95 /* _ */, start, end);
        }