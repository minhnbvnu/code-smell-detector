function _Detab(text) {
            if (!/\t/.test(text))
                return text;

            var spaces = ["    ", "   ", "  ", " "],
            skew = 0,
            v;

            return text.replace(/[\n\t]/g, function (match, offset) {
                if (match === "\n") {
                    skew = offset + 1;
                    return match;
                }
                v = (offset - skew) % 4;
                skew = offset + 1;
                return spaces[v];
            });
        }