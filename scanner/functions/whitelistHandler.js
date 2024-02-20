function whitelistHandler(target, whitelist) {
    var catchall = Object.create(null, {});
    var redirect = Dict.create(whitelist).mapObject(function(name) { return target; });
    return mixinHandler(redirect, catchall);
}