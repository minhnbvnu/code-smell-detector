function GetCsNameArgument(parser, name) {
            var cs = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(name));
            if (cs.charAt(0) === '\\') {
                cs = cs.substr(1);
            }
            if (!cs.match(/^(.|[a-z]+)$/i)) {
                throw new TexError_js_1.default('IllegalControlSequenceName', 'Illegal control sequence name for %1', name);
            }
            return cs;
        }