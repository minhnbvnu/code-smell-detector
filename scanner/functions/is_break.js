function is_break(node, stack) {
                return node instanceof AST_Break
                    && stack.loopcontrol_target(node) === self;
            }