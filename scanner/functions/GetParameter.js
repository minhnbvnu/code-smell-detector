function GetParameter(parser, name, param) {
            if (param == null) {
                return parser.GetArgument(name);
            }
            var i = parser.i;
            var j = 0;
            var hasBraces = 0;
            while (parser.i < parser.string.length) {
                var c = parser.string.charAt(parser.i);
                if (c === '{') {
                    if (parser.i === i) {
                        hasBraces = 1;
                    }
                    parser.GetArgument(name);
                    j = parser.i - i;
                }
                else if (MatchParam(parser, param)) {
                    if (hasBraces) {
                        i++;
                        j -= 2;
                    }
                    return parser.string.substr(i, j);
                }
                else if (c === '\\') {
                    parser.i++;
                    j++;
                    hasBraces = 0;
                    var match = parser.string.substr(parser.i).match(/[a-z]+|./i);
                    if (match) {
                        parser.i += match[0].length;
                        j = parser.i - i;
                    }
                }
                else {
                    parser.i++;
                    j++;
                    hasBraces = 0;
                }
            }
            throw new TexError_js_1.default('RunawayArgument', 'Runaway argument for %1?', name);
        }