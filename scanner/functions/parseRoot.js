function parseRoot(parser, n) {
        var env = parser.stack.env;
        var inRoot = env['inRoot'];
        env['inRoot'] = true;
        var newParser = new TexParser_js_1.default(n, env, parser.configuration);
        var node = newParser.mml();
        var global = newParser.stack.global;
        if (global['leftRoot'] || global['upRoot']) {
            var def = {};
            if (global['leftRoot']) {
                def['width'] = global['leftRoot'];
            }
            if (global['upRoot']) {
                def['voffset'] = global['upRoot'];
                def['height'] = global['upRoot'];
            }
            node = parser.create('node', 'mpadded', [node], def);
        }
        env['inRoot'] = inRoot;
        return node;
    }