function getOpeningBracket(format) {
            return brackets[format & 15360 /* BracketsMask */][0];
        }