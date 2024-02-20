function glyph_from_mode(defaults, glyph) {
                if (glyph instanceof glyph_1.Glyph) {
                    return glyph;
                }
                else if (glyph == "auto") {
                    return mk_glyph(defaults);
                }
                return mk_glyph({ fill: {}, line: {} });
            }