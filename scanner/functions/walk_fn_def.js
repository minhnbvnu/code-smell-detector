function walk_fn_def(tw, fn) {
            var was_scanning = tw.fn_scanning;
            tw.fn_scanning = fn;
            fn.walk(tw);
            tw.fn_scanning = was_scanning;
        }