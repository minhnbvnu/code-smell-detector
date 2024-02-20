function variable(parser, c) {
            var def = ParseUtil_js_1.default.getFontDef(parser);
            var env = parser.stack.env;
            if (env.multiLetterIdentifiers && env.font !== '') {
                c = parser.string.substr(parser.i - 1).match(env.multiLetterIdentifiers)[0];
                parser.i += c.length - 1;
                if (def.mathvariant === TexConstants_js_1.TexConstant.Variant.NORMAL && env.noAutoOP && c.length > 1) {
                    def.autoOP = false;
                }
            }
            var node = parser.create('token', 'mi', def, c);
            parser.Push(node);
        }