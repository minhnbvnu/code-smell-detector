function pointFromArray(arg) {
    var x = arg[0];
    var y = arg.length > 1 ? arg[1] : x;
    return {x: x, y: y};
}