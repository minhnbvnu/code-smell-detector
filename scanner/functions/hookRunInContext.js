function hookRunInContext(matcher, transformer, opts) {
    opts = opts || {};
    const fn = transformFn(matcher, transformer, opts.verbose);
    vm.runInContext = function(code, context, file) {
        const ret = fn(code, file);
        const coverageVariable = opts.coverageVariable || '__coverage__';
        // Refer coverage variable in context to global coverage variable.
        // So that coverage data will be written in global coverage variable for unit tests run in vm.runInContext.
        // If all unit tests are run in vm.runInContext, no global coverage variable will be generated.
        // Thus initialize a global coverage variable here.
        if (!global[coverageVariable]) {
            global[coverageVariable] = {};
        }
        context[coverageVariable] = global[coverageVariable];
        return originalRunInContext(ret.code, context, file);
    };
}