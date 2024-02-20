function pop_scope(tw, scope) {
            var fn_defs = scope.fn_defs;
            var tangled = scope.may_call_this === return_true ? fn_defs : fn_defs.filter(function(fn) {
                if (fn.safe_ids === false) return true;
                fn.safe_ids = tw.safe_ids;
                walk_fn_def(tw, fn);
                return false;
            });
            pop(tw);
            tangled.forEach(function(fn) {
                fn.safe_ids = tw.safe_ids;
                walk_fn_def(tw, fn);
            });
            fn_defs.forEach(function(fn) {
                delete fn.safe_ids;
            });
            delete scope.fn_defs;
            delete scope.may_call_this;
        }