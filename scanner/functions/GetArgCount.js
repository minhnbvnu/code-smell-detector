function GetArgCount(parser, name) {
            var n = parser.GetBrackets(name);
            if (n) {
                n = ParseUtil_js_1.default.trimSpaces(n);
                if (!n.match(/^[0-9]+$/)) {
                    throw new TexError_js_1.default('IllegalParamNumber', 'Illegal number of parameters specified in %1', name);
                }
            }
            return n;
        }