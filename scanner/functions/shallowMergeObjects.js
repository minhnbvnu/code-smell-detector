function shallowMergeObjects(/** argn, ... **/) {
    var arg_idx, arg,
        data = {};

    for(arg_idx=0; arg_idx<arguments.length; arg_idx++) {
        arg = arguments[arg_idx];

        if (!arg) {
            continue;
        }

        for(var prop in arg) {
            if (arg.hasOwnProperty(prop)) {
                data[prop] = arg[prop];
            }
        }
    }

    return data;
}