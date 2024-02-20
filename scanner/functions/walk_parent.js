function walk_parent(node, cb, initial_stack) {
            const to_visit = [node];
            const push = to_visit.push.bind(to_visit);
            const stack = initial_stack ? initial_stack.slice() : [];
            const parent_pop_indices = [];
            let current;
            const info = {
                parent: (n = 0) => {
                    if (n === -1) {
                        return current;
                    }
                    // [ p1 p0 ] [ 1 0 ]
                    if (initial_stack && n >= stack.length) {
                        n -= stack.length;
                        return initial_stack[initial_stack.length - (n + 1)];
                    }
                    return stack[stack.length - (1 + n)];
                },
            };
            while (to_visit.length) {
                current = to_visit.pop();
                while (parent_pop_indices.length &&
                    to_visit.length == parent_pop_indices[parent_pop_indices.length - 1]) {
                    stack.pop();
                    parent_pop_indices.pop();
                }
                const ret = cb(current, info);
                if (ret) {
                    if (ret === walk_abort)
                        return true;
                    continue;
                }
                const visit_length = to_visit.length;
                current._children_backwards(push);
                // Push only if we're going to traverse the children
                if (to_visit.length > visit_length) {
                    stack.push(current);
                    parent_pop_indices.push(visit_length - 1);
                }
            }
            return false;
        }