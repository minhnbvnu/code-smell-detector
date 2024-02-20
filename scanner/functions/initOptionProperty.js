function initOptionProperty(toOptions, fromOptions) {
        toOptions.mode = fromOptions.mode || "strict";
        // Set value of beforeColon
        if (typeof fromOptions.beforeColon !== "undefined") {
            toOptions.beforeColon = +fromOptions.beforeColon;
        }
        else {
            toOptions.beforeColon = 0;
        }
        // Set value of afterColon
        if (typeof fromOptions.afterColon !== "undefined") {
            toOptions.afterColon = +fromOptions.afterColon;
        }
        else {
            toOptions.afterColon = 1;
        }
        // Set align if exists
        if (typeof fromOptions.align !== "undefined") {
            if (typeof fromOptions.align === "object") {
                toOptions.align = fromOptions.align;
            }
            else { // "string"
                toOptions.align = {
                    on: fromOptions.align,
                    mode: toOptions.mode,
                    beforeColon: toOptions.beforeColon,
                    afterColon: toOptions.afterColon
                };
            }
        }
        return toOptions;
    }