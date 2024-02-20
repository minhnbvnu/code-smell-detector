function controlSequence(parser, _c) {
            var name = parser.GetCS();
            parser.parse('macro', [parser, name]);
        }