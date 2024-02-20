function GetCSname(parser, cmd) {
            var c = parser.GetNext();
            if (c !== '\\') {
                throw new TexError_js_1.default('MissingCS', '%1 must be followed by a control sequence', cmd);
            }
            var cs = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(cmd));
            return cs.substr(1);
        }