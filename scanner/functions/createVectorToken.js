function createVectorToken(factory, kind, def, text) {
        var parser = factory.configuration.parser;
        var token = NodeFactory_js_1.NodeFactory.createToken(factory, kind, def, text);
        var code = text.codePointAt(0);
        if (text.length === 1 && !parser.stack.env.font &&
            parser.stack.env.vectorFont &&
            (inRange(code, latinCap) || inRange(code, latinSmall) ||
                inRange(code, greekCap) || inRange(code, digits) ||
                (inRange(code, greekSmall) && parser.stack.env.vectorStar) ||
                NodeUtil_js_1.default.getAttribute(token, 'accent'))) {
            NodeUtil_js_1.default.setAttribute(token, 'mathvariant', parser.stack.env.vectorFont);
        }
        return token;
    }