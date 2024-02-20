function mathchar7(parser, mchar) {
            var def = mchar.attributes || { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL };
            if (parser.stack.env['font']) {
                def['mathvariant'] = parser.stack.env['font'];
            }
            var node = parser.create('token', 'mi', def, mchar.char);
            parser.Push(node);
        }