function pleaseUse(requireString, module) {
    if (!pleaseUse.warned[requireString]) {
        var key = requireString.match(/\w+$/)[0];
        console.warn('Reference to ' + key + ' external module using' +
            ' `Hypergrid.' + key + '.` has been deprecated as of v3.0.0 in favor of' +
            ' `require(\'' + requireString + '\')` from within a Hypergrid Client Module' +
            ' (otherwise use `Hypergrid.require(...)`) and will be removed in a future release.' +
            ' See https://github.com/fin-hypergrid/core/wiki/Client-Modules#internal-modules.');
        pleaseUse.warned[requireString] = true;
    }
    return module;
}