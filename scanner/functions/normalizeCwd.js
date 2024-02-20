function normalizeCwd(cwd) {
        if (cwd) {
            return cwd;
        }
        if (typeof process === "object") {
            return process.cwd();
        }
        // It's more explicit to assign the undefined
        // eslint-disable-next-line no-undefined -- Consistently returning a value
        return undefined;
    }