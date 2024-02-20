function mark_fn_def(tw, def, fn) {
            if (!HOP(fn, "safe_ids")) return;
            var marker = fn.safe_ids;
            if (marker === false) return;
            if (fn.parent_scope.resolve().may_call_this === return_true) {
                if (member(fn, tw.fn_visited)) revisit_fn_def(tw, fn);
            } else if (marker) {
                var visited = member(fn, tw.fn_visited);
                if (marker === tw.safe_ids) {
                    if (!visited) walk_fn_def(tw, fn);
                } else if (visited) {
                    revisit_fn_def(tw, fn);
                } else {
                    fn.safe_ids = false;
                }
            } else if (tw.fn_scanning && tw.fn_scanning !== def.scope.resolve()) {
                fn.safe_ids = false;
            } else {
                fn.safe_ids = tw.safe_ids;
                walk_fn_def(tw, fn);
            }
        }