function createBoldToken(factory, kind, def, text) {
        var token = NodeFactory_js_1.NodeFactory.createToken(factory, kind, def, text);
        if (kind !== 'mtext' &&
            factory.configuration.parser.stack.env['boldsymbol']) {
            NodeUtil_js_1.default.setProperty(token, 'fixBold', true);
            factory.configuration.addNode('fixBold', token);
        }
        return token;
    }