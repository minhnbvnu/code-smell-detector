function buildDateEXP(pattern, tokens) {
            return pattern.replace(/([a-z])\1*/ig,function (match) {
                // Build a simple regexp.  Avoid captures, which would ruin the tokens list
                var s,
                    c = match.charAt(0),
                    l = match.length,
                    p2 = '0?',
                    p3 = '0{0,2}';
                if (c === 'y') {
                    s = '\\d{2,4}';
                } else if (c === "M") {
                    s = (l > 2) ? '\\S+?' : '1[0-2]|' + p2 + '[1-9]';
                } else if (c === "D") {
                    s = '[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|' + p3 + '[1-9][0-9]|' + p2 + '[1-9]';
                } else if (c === "d") {
                    s = '3[01]|[12]\\d|' + p2 + '[1-9]';
                } else if (c === "w") {
                    s = '[1-4][0-9]|5[0-3]|' + p2 + '[1-9]';
                } else if (c === "E") {
                    s = '\\S+';
                } else if (c === "h") {
                    s = '1[0-2]|' + p2 + '[1-9]';
                } else if (c === "K") {
                    s = '1[01]|' + p2 + '\\d';
                } else if (c === "H") {
                    s = '1\\d|2[0-3]|' + p2 + '\\d';
                } else if (c === "k") {
                    s = '1\\d|2[0-4]|' + p2 + '[1-9]';
                } else if (c === "m" || c === "s") {
                    s = '[0-5]\\d';
                } else if (c === "S") {
                    s = '\\d{' + l + '}';
                } else if (c === "a") {
                    var am = 'AM', pm = 'PM';
                    s = am + '|' + pm;
                    if (am !== am.toLowerCase()) {
                        s += '|' + am.toLowerCase();
                    }
                    if (pm !== pm.toLowerCase()) {
                        s += '|' + pm.toLowerCase();
                    }
                    s = s.replace(/\./g, "\\.");
                } else if (c === 'v' || c === 'z' || c === 'Z' || c === 'G' || c === 'q' || c === 'Q') {
                    s = ".*";
                } else {
                    s = c === " " ? "\\s*" : c + "*";
                }
                if (tokens) {
                    tokens.push(match);
                }

                return "(" + s + ")"; // add capture
            }).replace(/[\xa0 ]/g, "[\\s\\xa0]"); // normalize whitespace.  Need explicit handling of \xa0 for IE.
        }