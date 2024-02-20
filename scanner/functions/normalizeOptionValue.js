function normalizeOptionValue(value) {
        let multiline = false;
        let minProperties = Number.POSITIVE_INFINITY;
        let consistent = false;
        if (value) {
            if (value === "always") {
                minProperties = 0;
            }
            else if (value === "never") {
                minProperties = Number.POSITIVE_INFINITY;
            }
            else {
                multiline = Boolean(value.multiline);
                minProperties = value.minProperties || Number.POSITIVE_INFINITY;
                consistent = Boolean(value.consistent);
            }
        }
        else {
            consistent = true;
        }
        return { multiline, minProperties, consistent };
    }