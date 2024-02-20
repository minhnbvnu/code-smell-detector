function digit(parser, c) {
            var mml;
            var pattern = parser.configuration.options['digits'];
            var n = parser.string.slice(parser.i - 1).match(pattern);
            var def = ParseUtil_js_1.default.getFontDef(parser);
            if (n) {
                mml = parser.create('token', 'mn', def, n[0].replace(/[{}]/g, ''));
                parser.i += n[0].length - 1;
            }
            else {
                mml = parser.create('token', 'mo', def, c);
            }
            parser.Push(mml);
        }