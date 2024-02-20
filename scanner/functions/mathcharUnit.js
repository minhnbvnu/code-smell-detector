function mathcharUnit(parser, mchar) {
        var def = mchar.attributes || {};
        def.mathvariant = TexConstants_js_1.TexConstant.Variant.NORMAL;
        def.class = 'MathML-Unit';
        var node = parser.create('token', 'mi', def, mchar.char);
        parser.Push(node);
    }