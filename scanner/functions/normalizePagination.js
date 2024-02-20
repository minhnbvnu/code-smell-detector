function normalizePagination(fn, selector, normalize, opts) {
    opts = opts || {};

    opts.PageSize = opts.limit || 20;
    delete opts.limit;

    if (opts.page) {
        opts.Page = (opts.page || 0);
        opts.PageToken = opts.pagetoken;
        delete opts.page;
        delete opts.pagetoken;
    }

    return Q.nfcall(fn, opts)
    .then(function(result) {
        var items = result[selector];
        return {
            list: _.map(items, normalize),
            start: result.start || 0,
            limit: result.pageSize,
            pages: {
                previous: normalizePage(result.previousPageUri),
                next: normalizePage(result.nextPageUri)
            }
        };
    });
}