function fn$() {
            var i$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = xss).length; i$ < len$; ++i$) {
                xs = ref$[i$];
                results$.push(xs[i]);
            }
            return results$;
        }