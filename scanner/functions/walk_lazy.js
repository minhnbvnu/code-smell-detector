function walk_lazy() {
                if (!lazy) return;
                left.walk(tw);
                push(tw);
                right.walk(tw);
                pop(tw);
                return true;
            }