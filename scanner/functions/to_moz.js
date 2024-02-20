function to_moz(node) {
                if (TO_MOZ_STACK === null) {
                    TO_MOZ_STACK = [];
                }
                TO_MOZ_STACK.push(node);
                var ast = node != null ? node.to_mozilla_ast(TO_MOZ_STACK[TO_MOZ_STACK.length - 2]) : null;
                TO_MOZ_STACK.pop();
                if (TO_MOZ_STACK.length === 0) {
                    TO_MOZ_STACK = null;
                }
                return ast;
            }