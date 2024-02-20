function from_moz(node) {
                FROM_MOZ_STACK.push(node);
                var ret = node != null ? MOZ_TO_ME[node.type](node) : null;
                FROM_MOZ_STACK.pop();
                return ret;
            }