function introspectObject(obj, symbols, dependsOn, line) {
    if(_.isString(obj)) {
        introspectString(obj, symbols, dependsOn, line);
    }
    else if(_.isArray(obj)) {
        _.each(obj, function(v) {
            introspectObject(v, symbols, dependsOn, line);
        });
    }
    else if(_.isObject(obj)) {
        _.each(obj, function(v, n) {
            if(_.isString(v)) {
                introspectString(v, symbols, dependsOn, line);
            }
            else if(_.isArray(v)) {
                var arr = [];
                _.each(v, function(vi) {
                    introspectObject(vi, symbols, dependsOn, line);
                });
                ret[n] = arr;
            }
            else {
                introspectObject(v, symbols, dependsOn, line);
            }
        });
    }
}