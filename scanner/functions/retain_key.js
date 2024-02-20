function retain_key(prop) {
                return prop.key instanceof AST_Node && prop.key.has_side_effects(compressor);
            }