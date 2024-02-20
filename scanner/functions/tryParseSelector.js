function tryParseSelector(rawSelector) {
        try {
            return esquery.parse(rawSelector.replace(/:exit$/u, ""));
        }
        catch (err) {
            if (err.location && err.location.start && typeof err.location.start.offset === "number") {
                throw new SyntaxError(`Syntax error in selector "${rawSelector}" at position ${err.location.start.offset}: ${err.message}`);
            }
            throw err;
        }
    }