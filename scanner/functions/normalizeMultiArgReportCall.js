function normalizeMultiArgReportCall(...args) {
        // If there is one argument, it is considered to be a new-style call already.
        if (args.length === 1) {
            // Shallow clone the object to avoid surprises if reusing the descriptor
            return Object.assign({}, args[0]);
        }
        // If the second argument is a string, the arguments are interpreted as [node, message, data, fix].
        if (typeof args[1] === "string") {
            return {
                node: args[0],
                message: args[1],
                data: args[2],
                fix: args[3]
            };
        }
        // Otherwise, the arguments are interpreted as [node, loc, message, data, fix].
        return {
            node: args[0],
            loc: args[1],
            message: args[2],
            data: args[3],
            fix: args[4]
        };
    }