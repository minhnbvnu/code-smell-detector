function Other(parser, char) {
        var font = parser.stack.env['font'];
        var def = font ?
            { mathvariant: parser.stack.env['font'] } : {};
        var remap = MapHandler_js_1.MapHandler.getMap('remap').lookup(char);
        var range = (0, OperatorDictionary_js_1.getRange)(char);
        var type = (range ? range[3] : 'mo');
        var mo = parser.create('token', type, def, (remap ? remap.char : char));
        range[4] && mo.attributes.set('mathvariant', range[4]);
        if (type === 'mo') {
            NodeUtil_js_1.default.setProperty(mo, 'fixStretchy', true);
            parser.configuration.addNode('fixStretchy', mo);
        }
        parser.Push(mo);
    }