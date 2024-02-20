function getFontDef(parser) {
            var font = parser.stack.env['font'];
            return (font ? { mathvariant: font } : {});
        }