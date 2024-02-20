function hookCreateScript(matcher, transformer, opts) {
    opts = opts || {};
    const fn = transformFn(matcher, transformer, opts.verbose);
    vm.createScript = function(code, file) {
        const ret = fn(code, file);
        return originalCreateScript(ret.code, file);
    };
}