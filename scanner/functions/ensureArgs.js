function ensureArgs(name, behavior, args) {
    // map function name to internal property
    //   callsArg => callArgAt
    var property = name.replace(/sArg/, "ArgAt");
    var index = behavior[property];

    if (index >= args.length) {
        throw new TypeError(
            name + " failed: " + (index + 1) + " arguments required but only " + args.length + " present"
        );
    }
}