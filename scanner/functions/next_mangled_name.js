function next_mangled_name(def, options) {
    var scope = def.scope;
    var in_use = names_in_use(scope, options);
    var holes = scope.cname_holes;
    var names = Object.create(null);
    var scopes = [ scope ];
    def.forEach(function(sym) {
        var scope = sym.scope;
        do {
            if (scopes.indexOf(scope) < 0) {
                for (var name in names_in_use(scope, options)) {
                    names[name] = true;
                }
                scopes.push(scope);
            } else break;
        } while (scope = scope.parent_scope);
    });
    var name;
    for (var i = 0; i < holes.length; i++) {
        name = base54(holes[i]);
        if (names[name]) continue;
        holes.splice(i, 1);
        in_use[name] = true;
        return name;
    }
    while (true) {
        name = base54(++scope.cname);
        if (in_use[name] || RESERVED_WORDS[name] || options.reserved.has[name]) continue;
        if (!names[name]) break;
        holes.push(scope.cname);
    }
    in_use[name] = true;
    return name;
}