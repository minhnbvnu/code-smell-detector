function vsprintf(fmt, argv) {
            return sprintf.apply(null, [fmt].concat(argv || []));
        }