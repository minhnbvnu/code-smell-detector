function getClosingBracket(format) {
            return brackets[format & 15360 /* BracketsMask */][1];
        }