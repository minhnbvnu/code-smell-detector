function may_throw_destructured(node, value) {
                if (!value) return !(node instanceof AST_Symbol);
                if (node instanceof AST_DefaultValue) {
                    return value.has_side_effects(compressor)
                        || node.value.has_side_effects(compressor)
                        || may_throw_destructured(node.name, is_undefined(value) && node.value);
                }
                if (node instanceof AST_Destructured) {
                    if (node.rest && may_throw_destructured(node.rest)) return true;
                    if (node instanceof AST_DestructuredArray) {
                        if (!(value instanceof AST_Array || value.is_string(compressor))) return true;
                        return !all(node.elements, function(element) {
                            return !may_throw_destructured(element);
                        });
                    }
                    if (node instanceof AST_DestructuredObject) {
                        if (!value.is_defined(compressor)) return true;
                        return !all(node.properties, function(prop) {
                            if (prop instanceof AST_Node && prop.has_side_effects(compressor)) return false;
                            return !may_throw_destructured(prop.value);
                        });
                    }
                }
            }