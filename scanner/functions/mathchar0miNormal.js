function mathchar0miNormal(parser, mchar) {
        var def = mchar.attributes || {};
        def.mathvariant = TexConstants_js_1.TexConstant.Variant.NORMAL;
        var node = parser.create('token', 'mi', def, mchar.char);
        parser.Push(node);
    }