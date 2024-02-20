function resolveUdf(opts, where) {
    var fname = where.name;
    var fn = jsonPath.eval(opts.context, fname);
    return fn[0];
}