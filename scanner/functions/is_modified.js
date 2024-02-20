function is_modified(compressor, tw, node, value, level, immutable) {
            var parent = tw.parent(level);
            var lhs = is_lhs(node, parent);
            if (lhs)
                return lhs;
            if (!immutable
                && parent instanceof AST_Call
                && parent.expression === node
                && !(value instanceof AST_Arrow)
                && !(value instanceof AST_Class)
                && !parent.is_callee_pure(compressor)
                && (!(value instanceof AST_Function)
                    || !(parent instanceof AST_New) && value.contains_this())) {
                return true;
            }
            if (parent instanceof AST_Array) {
                return is_modified(compressor, tw, parent, parent, level + 1);
            }
            if (parent instanceof AST_ObjectKeyVal && node === parent.value) {
                var obj = tw.parent(level + 1);
                return is_modified(compressor, tw, obj, obj, level + 2);
            }
            if (parent instanceof AST_PropAccess && parent.expression === node) {
                var prop = read_property(value, parent.property);
                return !immutable && is_modified(compressor, tw, parent, prop, level + 1);
            }
        }