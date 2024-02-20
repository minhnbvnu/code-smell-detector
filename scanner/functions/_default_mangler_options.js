function _default_mangler_options(options) {
    options = defaults(options, {
        eval        : false,
        ie          : false,
        keep_fnames : false,
        reserved    : [],
        toplevel    : false,
        v8          : false,
        webkit      : false,
    });
    if (!Array.isArray(options.reserved)) options.reserved = [];
    // Never mangle arguments
    push_uniq(options.reserved, "arguments");
    options.reserved.has = makePredicate(options.reserved);
    return options;
}