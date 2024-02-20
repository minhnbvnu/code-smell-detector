function testTooltips(parsed, entry) {
            if (entry === false) {
                return;
            }
            if (entry === true || isValidPartialFormatter(entry)) {
                parsed.tooltips = [];
                for (var i = 0; i < parsed.handles; i++) {
                    parsed.tooltips.push(entry);
                }
            }
            else {
                entry = asArray(entry);
                if (entry.length !== parsed.handles) {
                    throw new Error("noUiSlider: must pass a formatter for all handles.");
                }
                entry.forEach(function (formatter) {
                    if (typeof formatter !== "boolean" && !isValidPartialFormatter(formatter)) {
                        throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                    }
                });
                parsed.tooltips = entry;
            }
        }