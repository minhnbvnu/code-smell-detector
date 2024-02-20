function drop_rest_farg(fn, compressor) {
        if (!compressor.option("rests")) return;
        if (fn.uses_arguments) return;
        if (!(fn.rest instanceof AST_DestructuredArray)) return;
        if (!compressor.drop_fargs(fn, compressor.parent())) return;
        fn.argnames = fn.argnames.concat(fn.rest.elements);
        fn.rest = fn.rest.rest;
    }