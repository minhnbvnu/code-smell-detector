function testCssPrefix(parsed, entry) {
            if (typeof entry !== "string" && entry !== false) {
                throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
            }
            parsed.cssPrefix = entry;
        }