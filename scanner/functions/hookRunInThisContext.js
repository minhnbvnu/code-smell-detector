function hookRunInThisContext(matcher, transformer, opts) {
    opts = opts || {};
    const fn = transformFn(matcher, transformer, opts.verbose);
    vm.runInThisContext = function(code, options) {
        const ret = fn(code, options);
        return originalRunInThisContext(ret.code, options);
    };
}