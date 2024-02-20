function emitComplete() {
        completed = true;

        var funcs = prevented ? prevented_fn : completed_fn;
        funcs = funcs || [];

        // Call the completed/prevented functions
        for (var idx = 0; idx < funcs.length; idx++) {
            if (typeof funcs[idx] === 'function') funcs[idx]();
        }
    }