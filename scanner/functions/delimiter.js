function delimiter(parser, delim) {
            var def = delim.attributes || {};
            def = Object.assign({ fence: false, stretchy: false }, def);
            var node = parser.create('token', 'mo', def, delim.char);
            parser.Push(node);
        }