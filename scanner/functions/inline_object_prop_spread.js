function inline_object_prop_spread(props, compressor) {
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (prop instanceof AST_Expansion) {
                    const expr = prop.expression;
                    if (expr instanceof AST_Object
                        && expr.properties.every(prop => prop instanceof AST_ObjectKeyVal)) {
                        props.splice(i, 1, ...expr.properties);
                        // Step back one, as the property at i is now new.
                        i--;
                    }
                    else if (expr instanceof AST_Constant
                        && !(expr instanceof AST_String)) {
                        // Unlike array-like spread, in object spread, spreading a
                        // non-iterable value silently does nothing; it is thus safe
                        // to remove. AST_String is the only iterable AST_Constant.
                        props.splice(i, 1);
                        i--;
                    }
                    else if (is_nullish(expr, compressor)) {
                        // Likewise, null and undefined can be silently removed.
                        props.splice(i, 1);
                        i--;
                    }
                }
            }
        }