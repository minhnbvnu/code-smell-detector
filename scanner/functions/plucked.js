function plucked(prop) {
    var exec = prop.match(/(\w+)\(\)$/);
    if (exec) {
        prop = exec[1];
        return function (item) {
            return item[prop]();
        };
    } else {
        return function (item) {
            return item[prop];
        };
    }
}