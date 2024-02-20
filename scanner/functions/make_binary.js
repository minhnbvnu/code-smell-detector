function make_binary(orig, op, left, right, start, end) {
            if (op == "+") {
                if (!left.is_boolean(compressor) && !left.is_number(compressor)) {
                    left = make_node(AST_UnaryPrefix, left, {
                        operator: "+",
                        expression: left
                    });
                }
                if (!right.is_boolean(compressor) && !right.is_number(compressor)) {
                    right = make_node(AST_UnaryPrefix, right, {
                        operator: "+",
                        expression: right
                    });
                }
            }
            return make_node(AST_Binary, orig, {
                operator: op,
                left: left,
                right: right,
                start: start,
                end: end
            });
        }