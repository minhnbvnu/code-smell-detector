function mathchar0mo(parser, mchar) {
            var def = mchar.attributes || {};
            def['stretchy'] = false;
            var node = parser.create('token', 'mo', def, mchar.char);
            NodeUtil_js_1.default.setProperty(node, 'fixStretchy', true);
            parser.configuration.addNode('fixStretchy', node);
            parser.Push(node);
        }