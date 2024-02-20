function mathchar0mi(parser, mchar) {
            var def = mchar.attributes || { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC };
            var node = parser.create('token', 'mi', def, mchar.char);
            parser.Push(node);
        }