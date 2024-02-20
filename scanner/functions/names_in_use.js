function names_in_use(scope, options) {
    var names = scope.names_in_use;
    if (!names) {
        scope.cname = -1;
        scope.cname_holes = [];
        scope.names_in_use = names = Object.create(null);
        var cache = options.cache && options.cache.props;
        scope.enclosed.forEach(function(def) {
            if (def.unmangleable(options)) names[def.name] = true;
            if (def.global && cache && cache.has(def.name)) {
                names[cache.get(def.name)] = true;
            }
        });
    }
    return names;
}