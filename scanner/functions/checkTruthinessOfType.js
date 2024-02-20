function checkTruthinessOfType(type, node) {
                if (type.flags & 16384 /* Void */) {
                    error(node, Diagnostics.An_expression_of_type_void_cannot_be_tested_for_truthiness);
                }
                return type;
            }