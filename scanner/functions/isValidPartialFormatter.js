function isValidPartialFormatter(entry) {
            // partial formatters only need a to function and not a from function
            return typeof entry === "object" && typeof entry.to === "function";
        }