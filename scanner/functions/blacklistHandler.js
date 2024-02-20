function blacklistHandler(target, blacklist) {
    var mask = Object.create(null, {});
    var redirect = Dict.create(blacklist).mapObject(function(name) { return mask; });
    return mixinHandler(redirect, target);
}