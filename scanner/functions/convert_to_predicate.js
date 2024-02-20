function convert_to_predicate(obj) {
        var map = Object.create(null);
        Object.keys(obj).forEach(function(key) {
            map[key] = makePredicate(obj[key]);
        });
        return map;
    }