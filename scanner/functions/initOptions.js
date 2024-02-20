function initOptions(toOptions, fromOptions) {
        if (typeof fromOptions.align === "object") {
            // Initialize the alignment configuration
            toOptions.align = initOptionProperty({}, fromOptions.align);
            toOptions.align.on = fromOptions.align.on || "colon";
            toOptions.align.mode = fromOptions.align.mode || "strict";
            toOptions.multiLine = initOptionProperty({}, (fromOptions.multiLine || fromOptions));
            toOptions.singleLine = initOptionProperty({}, (fromOptions.singleLine || fromOptions));
        }
        else { // string or undefined
            toOptions.multiLine = initOptionProperty({}, (fromOptions.multiLine || fromOptions));
            toOptions.singleLine = initOptionProperty({}, (fromOptions.singleLine || fromOptions));
            // If alignment options are defined in multiLine, pull them out into the general align configuration
            if (toOptions.multiLine.align) {
                toOptions.align = {
                    on: toOptions.multiLine.align.on,
                    mode: toOptions.multiLine.align.mode || toOptions.multiLine.mode,
                    beforeColon: toOptions.multiLine.align.beforeColon,
                    afterColon: toOptions.multiLine.align.afterColon
                };
            }
        }
        return toOptions;
    }