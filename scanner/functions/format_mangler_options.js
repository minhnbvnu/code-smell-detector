function format_mangler_options(options) {
            options = defaults(options, {
                eval: false,
                nth_identifier: base54,
                ie8: false,
                keep_classnames: false,
                keep_fnames: false,
                module: false,
                reserved: [],
                toplevel: false,
            });
            if (options.module)
                options.toplevel = true;
            if (!Array.isArray(options.reserved)
                && !(options.reserved instanceof Set)) {
                options.reserved = [];
            }
            options.reserved = new Set(options.reserved);
            // Never mangle arguments
            options.reserved.add("arguments");
            return options;
        }