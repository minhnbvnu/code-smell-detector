function mk_glyph(defaults) {
                const attrs = (0, object_1.clone)(glyph_attrs);
                if (has_fill)
                    (0, object_1.extend)(attrs, defaults.fill);
                if (has_line)
                    (0, object_1.extend)(attrs, defaults.line);
                return new base_glyph.constructor(attrs);
            }