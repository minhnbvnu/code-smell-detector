function findError (args) {
    let err;
    if (args) {
        if (args.length === 1) {
            return args[0];
        }
        for (const arg of args) {
            if (isErrorOrDOMErrorOrDOMException(arg)) {
                return arg;
            }
            if (arg && typeof arg.message === 'string') {
                err = arg;
            }
        }
    }
    return err;
}