function addAliases(d) {
    var i, mode, alias;
    var modes = Object.keys(aliases);
    for (i = 0; i < modes.length; i += 1) {
        mode = modes[i];
        alias = aliases[mode];
        d[mode] = d[alias];
    }
}