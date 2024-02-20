function plucker(prop) {
    prop = prop.split(".");
    if (prop.length === 1) {
        return plucked(prop[0]);
    } else {
        var pluckers = map(prop, function (prop) {
            return plucked(prop);
        });
        var l = pluckers.length;
        return function (item) {
            var i = -1, res = item;
            while (++i < l) {
                res = pluckers[i](res);
            }
            return res;
        };
    }
}